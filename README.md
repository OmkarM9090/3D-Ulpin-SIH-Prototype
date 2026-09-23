# BHUMI 3D: 3D ULPIN Generation & Vertical Property Mapping System
**SIH Problem Statement 26011 | Team Visionary Nexus | Smart India Hackathon 2026**

An AI-assisted geospatial land administration platform designed to transition two-dimensional cadastral records into structured three-dimensional property models with vertical volumetric identity, underground utility mapping, and automated spatial topology validation.

---

## 1. Executive Summary & Evidence Framework

This document presents a comprehensive, source-grounded breakdown of the proposed 3D-ULPIN System developed for **SIH Problem Statement 26011**. The analysis covers the full practical feature set across 13 core functional modules, evaluates candidate Unique Selling Propositions (USPs) to select the strongest differentiators, investigates real-world market drivers grounded in official government data, and maps existing competitive offerings across national digital public infrastructure (DPI) and municipal programs.

**Evidence Classification Hierarchy Applied:**
- **[Verified Fact]**: Backed directly by official government portals (DILRMP, SVAMITVA, Bhuvan, PM Gati Shakti), enacted municipal building bye-laws (UBBL 2016), or published research.
- **[Inference]**: Technical deduction derived from standard GIS/AI engineering principles and software documentation.
- **[Proposed Design]**: System specifications engineered specifically by Team Visionary Nexus for the SIH 2026 prototype.
- **[Synthetic Demo Data]**: Controlled test stand-in datasets used during the 36-hour hackathon execution.

---

## 2. Complete System Feature Set (13 Feature Groups)

The system encompasses 13 functional modules required to deliver a complete end-to-end 3D cadastral digital twin registry.

| Feature Group & Capability | Target User | Functional Purpose & Justification | Input Data | Output Deliverable |
| :--- | :--- | :--- | :--- | :--- |
| **1. Citizen Property Portal** | Citizen / Owner | Provides transparent verification of individual flat airspace, common areas, and undivided land share (UDS) [Verified Fact]. | 3D-ULPIN code, Owner Login | Exploded 3D view, downloadable PDF Property Card |
| **2. Surveyor Split-Screen Editor** | Surveyor / GIS Officer | Enables certified surveyors to inspect auto-extracted 3D geometries and fix vector distortions before registration [Inference]. | Raw LAS point cloud, PDF floor plans, GCP points | Verified 3D PolyhedralSurface geometry |
| **3. Sub-Registrar Approval Console** | Sub-Registrar Admin | Anchors spatial units to legal deeds under the ISO 19152 LADM schema and approves official title mutations [Verified Fact]. | Verified 3D solids, Sale deed, Owner ID hash | Minted 23-char 3D-ULPIN, Updated LADM database |
| **4. Public 3D Map Viewer** | Public / Banks / Utilities | Allows citizens and lenders to check spatial encumbrances and utility clearances without exposing personal data [Verified Fact]. | Public CityJSON, Bhuvan terrain tiles | Interactive WebGL 3D Map (CesiumJS) |
| **5. Automated Building Extractor** | System Pipeline (AI) | Eliminates manual 3D modeling by automatically classifying building structural points from urban noise [Inference]. | Unstructured LAS/LAZ point cloud | Isolated building point cloud envelope |
| **6. Procedural Solid Extruder** | System Pipeline (GIS) | Generates watertight 3D polyhedrons representing individual flat airspaces between floor bounds [Inference]. | 2D room polygons + Floor Zmin/Zmax heights | Closed 3D PolyhedralSurface Z solids |
| **7. Hierarchical 3D-ULPIN Generator** | System Core Engine | Creates a unique, 23-character, backward-compatible 3D identifier linked to Bhu-Aadhaar [Proposed Design]. | Base ULPIN + Layer Code + Floor + Unit ID | 23-Character 3D-ULPIN String |
| **8. Automated Topology Kernel** | System Validation Layer | Guarantees that 3D shapes are watertight (ISO 19107) and zero volumetric overlap exists between flats [Verified Fact]. | Extruded 3D unit solids | Boolean pass/fail report, Overlap error flags |
| **9. Subsurface Utility Registrar** | Municipal / Utility Agency | Maps below-ground infrastructure (Layer 'U') to prevent pipeline strikes and resolve underground easements [Proposed Design]. | Municipal utility shapefiles, pipe depth metadata | Subsurface 3D pipe/tunnel solids |
| **10. 3D Property Card Generator** | Citizen / Registrar | Produces a standardized, printable 3D Property Card featuring 3D unit visuals, volume, and ownership RRRs [Proposed Design]. | 3D-ULPIN, PostGIS LADM metadata | Printable 3D Property Card PDF report |
| **11. OAuth2 & Data Encryption** | System Security Core | Protects sensitive citizen PII and ownership documents while enforcing strict role boundaries [Verified Fact]. | User credentials, Owner Aadhaar/PAN | Encrypted tokens, Anonymous spatial views |
| **12. Immutable Mutation Ledger** | Sub-Registrar / Auditor | Provides an unalterable audit trail for legal dispute resolution and municipal tracking [Proposed Design]. | Mutation transactions, Surveyor edits | Versioned spatial database history |
| **13. Multi-Format Ingestion Engine** | System Data Layer | Harmonizes heterogeneous spatial formats onto a unified national coordinate grid [Verified Fact]. | GeoJSON, LAS, CartoDEM, PDF Blueprints | Co-registered WGS84 / UTM spatial layer |

---

## 3. 36-Hour Hackathon Priority Matrix & User Journey

To ensure a 100% functional, end-to-end working prototype within the strict 36-hour hackathon execution window, features are classified into four deployment tiers:

### Priority Matrix
- **MUST BUILD (Core Hackathon Prototype):** LADM PostGIS 3D Database Schema, RANSAC Point Cloud Floor Z-Slicer, Shapely 3D Volumetric Extruded Solids, PostGIS ST_3DIntersects Topology Validator, 23-Character 3D-ULPIN Generator (Luhn Checksum), Three.js Exploded Unit Web Viewer, ReportLab 3D Property Card PDF Engine.
- **SHOULD BUILD (Secondary Features):** CesiumJS City-Scale Map Backdrop Integration, Surveyor Split-Screen Editing Interface, OAuth2 JWT Role-Based Access Control (RBAC), Subsurface Negative Z Utility Extrusion.
- **CONTROLLED / DEMO DATA:** Pre-loaded SensatUrban / DALES LAS Point Cloud, ISRO Bhuvan CartoDEM 30m Elevation Raster, Pre-vectorized CubiCasa5K Floor Plan Polygons, 1 Representative Urban High-Rise (12 Flats + Basement).
- **FUTURE PRODUCTION:** Live Survey Drone Flight Ingestion Pipeline, Live Survey of India CORS Network RTK API Sync, Live Ground Penetrating Radar (GPR) Hardware Integration, Multi-State Legislative Mutation API Sync.

### End-to-End Core User Journey (36-Hour Execution Flow)
1. **Registration:** Builder/AOA logs in.
2. **Data Upload:** Uploads 2D parcel GeoJSON + PDF floor plans.
3. **GIS/AI Processing:** RANSAC detects floor Z-heights, Shapely extrudes 3D units.
4. **3D Property Generation:** Creates PolyhedralSurface Z solids.
5. **Topology Validation:** PostGIS checks zero overlap.
6. **Surveyor Verification:** Surveyor signs off in 3D UI (Split-Screen Review).
7. **Authority Review:** Sub-Registrar reviews and approves.
8. **3D-ULPIN Minting:** Generates 23-char token.
9. **3D Web GIS Map:** Renders exploded model in Three.js.
10. **Search & PDF Report:** Citizen searches 3D-ULPIN & downloads 3D Property Card PDF.

---

## 4. Evaluation of USPs & Selection of Top 5 Differentiators

To identify true market differentiators, features were evaluated against PS Relevance, Originality, Usefulness, Feasibility, Differentiation, and Government Value.

1. **Backward-Compatible 23-Char 3D-ULPIN [USP #1]:** Extends 14-digit Bhu-Aadhaar without breaking legacy state databases. High government value.
2. **Legal/Spatial Separation (ISO 19152 LADM) [USP #2]:** Bridges physical building geometry with legal ownership rights (RRRs). Solves legal gap.
3. **Zero-Touch RANSAC Floor Plate Slicing [USP #3]:** Fast, explainable deterministic plane-fitting (<50ms) avoiding black-box AI errors.
4. **Automated PostGIS 3D Overlap Prevention [USP #4]:** Database-level solid intersection check (`ST_3DIntersects`) blocking double titles.
5. **Multi-Layer Surface, Vertical & Subsurface Unified Registry [USP #5]:** Maps surface, vertical flats, and underground utility pipes in one unified 3D database.

---

## 5. Real-World Market Need & Evidence Analysis

The necessity for a 3D Cadastral Registry in India is driven by rapid urban verticalization and systemic limitations in flat land administration records.

1. **Resolution of Urban Land Litigation:** Land disputes account for ~66% of all civil litigation in India, with an average pendency of 20 years. BHUMI 3D provides machine-verifiable 3D spatial boundaries for high-rise flats, eliminating title ambiguity in multi-storey apartments.
2. **Municipal Property Tax Leakage Prevention:** Urban Local Bodies (ULBs) lose 20–30% of property tax revenue due to unassessed vertical floors. Enables automated FSI/FAR compliance auditing by comparing built 3D volumes against sanctioned municipal building plans.
3. **Subsurface Infrastructure & Utility Protection:** Underground utility strikes during excavation cause severe project delays and safety hazards. Registers below-ground infrastructure as Layer 'U' 3D-ULPIN volumes with explicit depth and clearance buffers.
4. **Policy Enablers (FOPs, LVC, TOD & TDR):** 4 key urban policy drivers require 3D spatial records. Provides a standardized 3D spatial key allowing municipalities and investors to manage strata titles and vertical development rights.
5. **Modernization of Apartment Ownership (RERA/UBBL):** While RERA requires carpet area disclosure, state land registries remain 100% 2D-only. Bridges the gap between architectural/RERA filings and state revenue land records via an automated ISO 19152 LADM registry.

---

## 6. Competitive Analysis & Gap Matrix

| Existing Platform / Program | Current Capabilities | Identified Gap / Limitation | Our Proposed 3D-ULPIN Solution |
| :--- | :--- | :--- | :--- |
| **ULPIN / Bhu-Aadhaar (DoLR)** | Generates 14-digit location-based ID for ground parcels. | Purely 2D surface parcel system. Collapses multi-storey high-rises into 1 ground point. | Extends 14-digit base ULPIN into a 23-character 3D token mapping vertical airspace. |
| **SVAMITVA Scheme (MoPR)** | Drone surveying of rural inhabited areas (Abadi) generating 2D property cards. | Focuses strictly on 2D horizontal ground plot boundaries. No vertical unit mapping. | Ingests SVAMITVA 2D footprints & drone imagery as the ground baseline for 3D extrusion. |
| **Bhuvan Geoportal (ISRO)** | Provides national 2D map layers, satellite imagery, and 30m CartoDEM elevation. | Lacks 3D cadastral database schemas and unit-level ownership registration capabilities. | Utilizes CartoDEM for terrain elevation baselines while managing 3D unit solids in PostGIS. |
| **Mumbai 3D City Model (BMC)** | High-resolution aerial LiDAR & reality mesh digital twin. | Constructs physical 3D meshes for visual urban planning; lacks legal ownership integration. | Injects the ISO 19152 LADM legal layer onto physical 3D building models. |
| **State Bhulekh / BhuNaksha** | Digital land record text registers (RoR) and 2D vector parcel maps. | No support for multi-storey flats, common areas, or subsurface infrastructure. | Plugs in as a non-disruptive 3D digital twin verification layer linked to 2D RoR records. |

---

## 7. Final Strategic Recommendations

**Summary of Top Strategic Pillars:**
- **Top 5 USPs:** (1) 23-char 3D-ULPIN, (2) ISO 19152 LADM, (3) RANSAC floor slicing, (4) PostGIS 3D overlap prevention, (5) Unified surface/vertical/subsurface registry.
- **Top 5 Market Needs:** (1) 66% land litigation reduction, (2) 20–30% municipal tax leakage recovery, (3) Subsurface utility damage prevention, (4) Enabler for FOPs/TOD/TDR, (5) Strata title modernization.
- **Top 5 Reasons Government Cares:** (1) Maximizes DILRMP DPI, (2) Increases tax collection, (3) Reduces court backlogs, (4) Enables PM Gati Shakti coordination, (5) Fosters investor confidence.
- **Top 5 Reasons Citizens Care:** (1) Unambiguous 3D ownership proof, (2) Protection against carpet-area fraud, (3) Legal guarantee over parking/common areas, (4) Faster mortgage approvals, (5) Transparent 3D Property Card.

**Clear SIH Differentiation Statement:**
> "While current national systems (Bhu-Aadhaar, SVAMITVA) map flat 2D ground parcels and municipal digital twin projects (BMC 3D City Model) generate empty physical 3D visual meshes, our system provides the missing legal-administrative bridge—integrating ISO 19152 LADM legal standards with automated RANSAC floor slicing and PostGIS 3D topology validation to assign every vertical apartment and subsurface utility a tamper-proof, backward-compatible 3D-ULPIN token."

---

## 8. Complete Data Requirements Audit

A rigorous, multi-dimensional 3D cadastral registry engine requires heterogeneous spatial and non-spatial inputs:

1. **Cadastral / 2D Parcel:** GeoJSON/Shapefile. State Revenue / BhuNaksha.
2. **Land Records / RoR:** JSON/XML/SQL. State Bhulekh / CERSAI / RERA.
3. **Building Footprints:** GeoJSON/Vector Tile. Google-Microsoft Open Buildings.
4. **Floor Plans / Layouts:** PDF/DWG/PNG. Municipal Approved PDF Plans.
5. **Drone Orthomosaic:** GeoTIFF (RGB). SVAMITVA Drone Survey / OpenDroneMap.
6. **LiDAR / Point Cloud:** ASPRS LAS / LAZ. Airborne Laser Scanning / DALES / SensatUrban.
7. **DEM / DSM / DTM:** GeoTIFF Raster. ISRO Bhuvan CartoDEM / Copernicus DEM.
8. **GNSS / CORS Anchors:** RTCM / RINEX / Text Coords. Survey of India CORS Network.
9. **Underground Utilities:** Shapefile / GeoJSON / CityGML. PM Gati Shakti NMP.
10. **Transport Networks:** GeoJSON / Vector Line. OpenStreetMap.
11. **AI Training Sets:** HDF5 / PyTorch Weights. PointNet++ / CubicCasa5K.

### Genuine Data Links & GIS API Directory
- **ISRO Bhuvan CartoDEM:** Raster GeoTIFF (https://bhuvan.nrsc.gov.in/)
- **Google-Microsoft Open Buildings:** Vector GeoJSON (https://github.com/google-research/openbuildings)
- **CubicCasa5K Floor Plans:** 5,000 Vectorized Floor Plan PDFs (https://github.com/CubicCasa/CubicCasa5k)
- **SensatUrban 3D Point Cloud:** ASPRS LAS (https://github.com/QingyongHu/SensatUrban)
- **Copernicus DEM (GLO-30):** 30m Global Elevation (https://spacedata.copernicus.eu/)

### Data Quality Framework & Missing-Data Fallback Cascades
**STRICT MISSING-DATA FALLBACK CASCADE ORDER:**
1. Official Government Access (DILRMP / SVAMITVA / Bhuvan / State APIs)
2. Authorized Surveyor Data Collection (DGPS GCPs / Local Drone Flight)
3. Derived/Open Geospatial Data (Google Open Buildings / OSM / CartoDEM)
4. Synthetic Procedural Generation (STRICTLY FOR ALGORITHM DEMO)

*CRITICAL RULE: Synthetic or derived data must be explicitly flagged in the database (`is_synthetic=TRUE`) and NEVER presented as official government titles.*

---

## 9. Data Structures & LADM-Compliant Schemas

To ensure seamless database persistence and Web GIS streaming, the system defines standardized data structures in PostGIS 3D and GeoJSON/CityJSON under the ISO 19152 (LADM) framework.

**Schema A: 2D Base Surface Parcel (GeoJSON)**
```json
{ "type": "Feature", "properties": { "ulpin_2d": "1234AB5678CD90", "khasra_no": "452/1", "state": "Maharashtra", "district": "Pune", "ground_elevation_msl": 560.42 }, "geometry": { "type": "Polygon", "coordinates": [[[73.8567, 18.5204], [73.8572, 18.5204], [73.8572, 18.5209], [73.8567, 18.5209], [73.8567, 18.5204]]] } }
```

**Schema B: 3D Volumetric Spatial Unit (LADM LA_SpatialUnit PostGIS SQL)**
```sql
CREATE TABLE la_spatial_unit_3d (
  unit_id VARCHAR(36) PRIMARY KEY,
  ulpin_3d VARCHAR(23) UNIQUE NOT NULL,
  parent_ulpin_2d VARCHAR(14) REFERENCES base_parcels(ulpin_2d),
  layer_code CHAR(1) CHECK (layer_code IN ('S', 'G', 'U')),
  floor_level INT NOT NULL,
  unit_number VARCHAR(10) NOT NULL,
  carpet_area_sqm NUMERIC(8,2) NOT NULL,
  volume_cu_m NUMERIC(10,2) NOT NULL,
  is_synthetic BOOLEAN DEFAULT FALSE,
  geom_polyhedral GEOMETRY(PolyhedralSurfaceZ, 32643) NOT NULL
);
```

**Schema C: Property Rights, Restrictions & Responsibilities (LADM LA_RRR SQL)**
```sql
CREATE TABLE la_rrr (
  rrr_id VARCHAR(36) PRIMARY KEY,
  ulpin_3d VARCHAR(23) REFERENCES la_spatial_unit_3d(ulpin_3d),
  owner_name VARCHAR(100) NOT NULL,
  owner_uid_hash CHAR(64) NOT NULL,
  right_type VARCHAR(50) DEFAULT 'FREEHOLD_OWNERSHIP',
  undivided_land_share_pct NUMERIC(5,2),
  mortgage_encumbrance BOOLEAN DEFAULT FALSE,
  encumbrance_bank_name VARCHAR(100)
);
```

---

## 10. Technology Stack & Installation

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19, TypeScript | Reactive state and user interface components |
| **Routing & Architecture** | TanStack Start, TanStack Router | File-based client-side routing and static export |
| **3D GIS Visualization** | Three.js, React Three Fiber, Drei | WebGL volumetric scene, camera controls, mesh rendering |
| **Styling & Design System**| Tailwind CSS v4, High-density Dark GIS Theme | Hardware-accelerated CSS tokens, scanlines, glassmorphism |
| **Build & Tooling** | Vite 8, Nitro, ESLint 9, Prettier | Module bundling, static site generation, and code formatting |

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OmkarM9090/3D-Ulpin-SIH-Prototype.git
   cd 3D-Ulpin-SIH-Prototype
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) (or the port displayed in your terminal).

### Production Build & Deployment

To create an optimized production build and generate static HTML routes:
```bash
npm run build
```

The project is configured for automated deployment via GitHub Actions:
- **Workflow:** `.github/workflows/ci-cd.yml`
- **Triggers:** Push to `main` and Pull Requests.
- **Output:** Builds with `GITHUB_PAGES=true` and deploys to GitHub Pages.

---

## 11. Data Disclaimer & Prototype Status

- **Demonstration Dataset:** The property records, dimensions, and parcel geometries in this repository represent a synthetic cadastral model.
- **Proposed Identifier Format:** The 3D ULPIN format implemented is a proposed research extension developed for the Smart India Hackathon and does not constitute an officially adopted standard by the Department of Land Resources (DoLR) or Survey of India (SoI).
- **Prototype Status:** Designed and tested for prototype demonstration purposes. Integration with official State land registry databases (e.g., Bhulekh) requires authorized API gateways.
