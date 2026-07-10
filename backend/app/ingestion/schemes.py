"""Registry of the 15 central welfare schemes in the corpus.

The slug is the scheme's identifier on myscheme.gov.in and doubles as the
stable scheme_id everywhere in Adhikaar (corpus, index, rules, eval labels).
"""

from pydantic import BaseModel


class SchemeSource(BaseModel):
    slug: str
    short_name: str
    name: str
    category: str


SCHEME_SOURCES: list[SchemeSource] = [
    SchemeSource(
        slug="pm-kisan",
        short_name="PM-KISAN",
        name="Pradhan Mantri Kisan Samman Nidhi",
        category="farmers",
    ),
    SchemeSource(
        slug="pmfby",
        short_name="PMFBY",
        name="Pradhan Mantri Fasal Bima Yojana",
        category="farmers",
    ),
    SchemeSource(
        slug="pmay-g",
        short_name="PMAY-G",
        name="Pradhan Mantri Awaas Yojana - Gramin",
        category="housing",
    ),
    SchemeSource(
        slug="nsap-ignoaps",
        short_name="IGNOAPS",
        name="Indira Gandhi National Old Age Pension Scheme",
        category="pension",
    ),
    SchemeSource(
        slug="ignwps",
        short_name="IGNWPS",
        name="Indira Gandhi National Widow Pension Scheme",
        category="pension",
    ),
    SchemeSource(
        slug="igndps",
        short_name="IGNDPS",
        name="Indira Gandhi National Disability Pension Scheme",
        category="pension",
    ),
    SchemeSource(
        slug="pmsby",
        short_name="PMSBY",
        name="Pradhan Mantri Suraksha Bima Yojana",
        category="insurance",
    ),
    SchemeSource(
        slug="pmjjby",
        short_name="PMJJBY",
        name="Pradhan Mantri Jeevan Jyoti Bima Yojana",
        category="insurance",
    ),
    SchemeSource(
        slug="apy",
        short_name="APY",
        name="Atal Pension Yojana",
        category="pension",
    ),
    SchemeSource(
        slug="ab-pmjay",
        short_name="PM-JAY",
        name="Ayushman Bharat Pradhan Mantri Jan Arogya Yojana",
        category="health",
    ),
    SchemeSource(
        slug="pmuy",
        short_name="PMUY",
        name="Pradhan Mantri Ujjwala Yojana",
        category="household",
    ),
    SchemeSource(
        slug="pm-svanidhi",
        short_name="PM SVANidhi",
        name="PM Street Vendor's AtmaNirbhar Nidhi",
        category="livelihood",
    ),
    SchemeSource(
        slug="pmv",
        short_name="PM Vishwakarma",
        name="PM Vishwakarma",
        category="livelihood",
    ),
]


class PdfSource(BaseModel):
    """A scheme whose official text comes from a government PDF instead of myScheme.

    Two schemes need this path: Sukanya Samriddhi is absent from myscheme.gov.in
    (we ingest the gazette notification published by India Post), and the central
    Post-Matric Scholarship for SC students is listed there only as state variants
    (we ingest the Dept. of Social Justice & Empowerment guidelines).
    """

    scheme_id: str
    short_name: str
    name: str
    category: str
    pdf_url: str
    page_url: str


PDF_SOURCES: list[PdfSource] = [
    PdfSource(
        scheme_id="sukanya-samriddhi",
        short_name="SSY",
        name="Sukanya Samriddhi Yojana (Sukanya Samriddhi Account Scheme, 2019)",
        category="savings",
        pdf_url=(
            "https://www.indiapost.gov.in/documents/offerings/schemesandservices/posb/"
            "SukanyaSamriddhiAccountScheme2019English.pdf"
        ),
        page_url="https://www.indiapost.gov.in/VAS/Pages/PMODashboard/SukanyaSamriddhiAccount.aspx",
    ),
    PdfSource(
        scheme_id="pms-sc",
        short_name="PMS-SC",
        name="Post Matric Scholarship for SC Students (PM-PMS-SC)",
        category="education",
        pdf_url=(
            "https://socialjustice.gov.in/writereaddata/UploadFile/"
            "PMS_for_SCs_Scheme_Guidelines.pdf"
        ),
        page_url="https://socialjustice.gov.in/schemes/25",
    ),
]
