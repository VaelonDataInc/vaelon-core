-- Master Asset Catalog Table
CREATE TABLE IF NOT EXISTS master_assets (
    id SERIAL PRIMARY KEY,
    asset_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    canonical_sku VARCHAR(255) UNIQUE NOT NULL,
    grade_tier VARCHAR(50),
    serial_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Time-Series Valuation Ledger Table
CREATE TABLE IF NOT EXISTS asset_valuations (
    id SERIAL PRIMARY KEY,
    asset_id INT REFERENCES master_assets(id) ON DELETE CASCADE,
    source_platform VARCHAR(50) NOT NULL,
    valuation_amount DECIMAL(12, 2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for high-frequency ingestion performance
CREATE INDEX IF NOT EXISTS idx_canonical_sku ON master_assets(canonical_sku);
CREATE INDEX IF NOT EXISTS idx_asset_valuations_recorded ON asset_valuations(asset_id, recorded_at DESC);
