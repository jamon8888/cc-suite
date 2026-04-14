#!/usr/bin/env python3
import json, sys, os

try:
    from docx import Document
    from docx.shared import Inches, Pt, RGBColor
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    from docx.enum.table import WD_TABLE_ALIGNMENT
    from docx.oxml.ns import nsdecls
    from docx.oxml import parse_xml
except ImportError:
    print(
        "ERROR: python-docx not installed. Run: pip install python-docx",
        file=sys.stderr,
    )
    sys.exit(2)

DB = RGBColor(0x1F, 0x38, 0x64)
MB = RGBColor(0x2E, 0x75, 0xB6)
LG = RGBColor(0x59, 0x59, 0x59)
RD = RGBColor(0xC0, 0x00, 0x00)
WH = RGBColor(0xFF, 0xFF, 0xFF)


def shade(cell, c):
    cell._tc.get_or_add_tcPr().append(
        parse_xml(f'<w:shd {nsdecls("w")} w:fill="{c}"/>')
    )


def ctxt(cell, text, bold=False, color=None, sz=None, fn=None):
    cell.text = ""
    r = cell.paragraphs[0].add_run(str(text))
    r.bold = bold
    if color:
        r.font.color.rgb = color
    if sz:
        r.font.size = Pt(sz)
    if fn:
        r.font.name = fn


def mktp(doc, d):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.space_before = Pt(120)
    r = p.add_run(d.get("title", "Untitled"))
    r.font.size = Pt(24)
    r.font.color.rgb = DB
    r.bold = True
    if d.get("subtitle"):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.space_before = Pt(12)
        r = p.add_run(d["subtitle"])
        r.font.size = Pt(14)
        r.font.color.rgb = LG
    if d.get("client"):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.space_before = Pt(36)
        r = p.add_run(d["client"])
        r.font.size = Pt(12)
    if d.get("date"):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.space_before = Pt(6)
        r = p.add_run(d["date"])
        r.font.size = Pt(12)
    if d.get("confidentiality"):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.space_before = Pt(180)
        r = p.add_run(d["confidentiality"])
        r.font.size = Pt(10)
        r.font.color.rgb = RD
    doc.add_page_break()


def mktbl(doc, b, fn="Calibri"):
    h = b.get("headers", [])
    rw = b.get("rows", [])
    if not h:
        return
    t = doc.add_table(rows=1 + len(rw), cols=len(h))
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, hd in enumerate(h):
        shade(t.rows[0].cells[i], "1F3864")
        ctxt(t.rows[0].cells[i], hd, bold=True, color=WH, sz=10, fn=fn)
    for ri, row in enumerate(rw):
        for ci, v in enumerate(row):
            if ri % 2 == 1:
                shade(t.rows[ri + 1].cells[ci], "D6E4F0")
            ctxt(t.rows[ri + 1].cells[ci], v, sz=10, fn=fn)
    p = doc.add_paragraph()
    p.space_before = Pt(6)


def mkblk(doc, b, fn="Calibri"):
    bt = b.get("type", "paragraph")
    if bt == "paragraph":
        p = doc.add_paragraph()
        r = p.add_run(b.get("text", ""))
        r.font.name = fn
        r.font.size = Pt(11)
    elif bt == "heading":
        lv = b.get("level", 2)
        p = doc.add_heading(b.get("text", ""), level=min(lv, 3))
        for r in p.runs:
            r.font.name = fn
            r.font.color.rgb = DB if lv <= 2 else MB
    elif bt == "table":
        mktbl(doc, b, fn)
    elif bt == "bullets":
        for it in b.get("items", []):
            p = doc.add_paragraph(style="List Bullet")
            r = p.add_run(it)
            r.font.name = fn
            r.font.size = Pt(11)
    elif bt == "numbered":
        for it in b.get("items", []):
            p = doc.add_paragraph(style="List Number")
            r = p.add_run(it)
            r.font.name = fn
            r.font.size = Pt(11)
    elif bt == "callout":
        p = doc.add_paragraph()
        p.space_before = Pt(6)
        p.space_after = Pt(6)
        s = b.get("style", "info")
        txt = b.get("text", "")
        pre = {"info": "Note: ", "warning": "WARNING: ", "critical": "CRITICAL: "}.get(
            s, "Note: "
        )
        co = {"info": MB, "warning": RGBColor(0xBF, 0x8F, 0x00), "critical": RD}.get(
            s, MB
        )
        r = p.add_run(pre + txt)
        r.font.name = fn
        r.font.size = Pt(10)
        r.font.color.rgb = co
        r.italic = True
    elif bt == "page_break":
        doc.add_page_break()
    elif bt == "separator":
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run("---")
        r.font.color.rgb = LG


def mksec(doc, s, fn="Calibri"):
    hd = s.get("heading", "")
    lv = s.get("level", 1)
    if hd:
        p = doc.add_heading(hd, level=min(lv, 3))
        for r in p.runs:
            r.font.name = fn
            r.font.color.rgb = DB if lv <= 2 else MB
    for b in s.get("content", []):
        mkblk(doc, b, fn)


def mkrn(doc, notes, fn="Calibri"):
    if not notes:
        return
    doc.add_page_break()
    p = doc.add_heading("Research Notes", level=1)
    for r in p.runs:
        r.font.name = fn
        r.font.color.rgb = DB
    p = doc.add_paragraph()
    r = p.add_run("Source traceability for all data points cited in this report.")
    r.font.name = fn
    r.font.size = Pt(9)
    r.font.color.rgb = LG
    r.italic = True
    for n in notes:
        p = doc.add_paragraph()
        p.space_before = Pt(3)
        p.space_after = Pt(3)
        r = p.add_run(f"[{n.get('id', '?')}] ")
        r.font.name = fn
        r.font.size = Pt(9)
        r.bold = True
        r = p.add_run(f'"{n.get("quote", "")}" ')
        r.font.name = fn
        r.font.size = Pt(9)
        d = f"- {n.get('source', 'Unknown')}"
        if n.get("date"):
            d += f", {n['date']}"
        d += f", {n.get('url', '[URL NOT AVAILABLE]')}"
        if n.get("cs_score"):
            d += f" - {n['cs_score']}"
        if n.get("status"):
            d += f" [{n['status']}]"
        r = p.add_run(d)
        r.font.name = fn
        r.font.size = Pt(9)
        r.font.color.rgb = LG


def mkps(doc, opts):
    m = opts.get("margins_inches", {})
    for s in doc.sections:
        s.top_margin = Inches(m.get("top", 1.0))
        s.bottom_margin = Inches(m.get("bottom", 1.0))
        s.left_margin = Inches(m.get("left", 1.25))
        s.right_margin = Inches(m.get("right", 1.25))


def mkpn(doc):
    for s in doc.sections:
        f = s.footer
        f.is_linked_to_previous = False
        p = f.paragraphs[0] if f.paragraphs else f.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run("Page ")
        r.font.size = Pt(9)
        r.font.color.rgb = LG
        r = p.add_run()
        r._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>'))
        r = p.add_run()
        r._r.append(
            parse_xml(
                f'<w:instrText {nsdecls("w")} xml:space="preserve"> PAGE </w:instrText>'
            )
        )
        r = p.add_run()
        r._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>'))
        r = p.add_run(" of ")
        r.font.size = Pt(9)
        r.font.color.rgb = LG
        r = p.add_run()
        r._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>'))
        r = p.add_run()
        r._r.append(
            parse_xml(
                f'<w:instrText {nsdecls("w")} xml:space="preserve"> NUMPAGES </w:instrText>'
            )
        )
        r = p.add_run()
        r._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>'))


def build(spec):
    doc = Document()
    opts = spec.get("options", {})
    fn = opts.get("font_name", "Calibri")
    doc.styles["Normal"].font.name = fn
    doc.styles["Normal"].font.size = Pt(opts.get("font_size", 11))
    for lv in range(1, 4):
        hs = doc.styles[f"Heading {lv}"]
        hs.font.name = fn
        hs.font.bold = True
        if lv == 1:
            hs.font.size = Pt(16)
            hs.font.color.rgb = DB
        elif lv == 2:
            hs.font.size = Pt(13)
            hs.font.color.rgb = DB
        else:
            hs.font.size = Pt(11)
            hs.font.color.rgb = MB
    if spec.get("title_page"):
        mktp(doc, spec["title_page"])
    if opts.get("include_toc", False):
        p = doc.add_paragraph()
        r = p.add_run("Table of Contents")
        r.font.size = Pt(16)
        r.font.color.rgb = DB
        r.bold = True
        p = doc.add_paragraph()
        r = p.add_run()
        r._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="begin"/>'))
        r = p.add_run()
        r._r.append(
            parse_xml(
                f'<w:instrText {nsdecls("w")} xml:space="preserve"> TOC </w:instrText>'
            )
        )
        r = p.add_run()
        r._r.append(parse_xml(f'<w:fldChar {nsdecls("w")} w:fldCharType="end"/>'))
        doc.add_page_break()
    for s in spec.get("sections", []):
        mksec(doc, s, fn)
    if spec.get("research_notes"):
        mkrn(doc, spec["research_notes"], fn)
    mkps(doc, opts)
    if opts.get("include_page_numbers", True):
        mkpn(doc)
    return doc


def main():
    if len(sys.argv) < 3:
        print("Usage: create_docx.py <spec.json|-> <output.docx>", file=sys.stderr)
        sys.exit(1)
    sp, op = sys.argv[1], sys.argv[2]
    if sp == "-":
        data = sys.stdin.read()
    else:
        if not os.path.exists(sp):
            print(f"ERROR: File not found: {sp}", file=sys.stderr)
            sys.exit(1)
        with open(sp, "r", encoding="utf-8") as fh:
            data = fh.read()
    try:
        spec = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"ERROR: Invalid JSON: {e}", file=sys.stderr)
        sys.exit(1)
    if not isinstance(spec, dict):
        print("ERROR: Spec must be JSON object", file=sys.stderr)
        sys.exit(1)
    try:
        doc = build(spec)
    except Exception as e:
        print(f"ERROR: Build failed: {e}", file=sys.stderr)
        sys.exit(1)
    try:
        doc.save(op)
        print(f"OK: Saved to {op}")
    except Exception as e:
        print(f"ERROR: Save failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
