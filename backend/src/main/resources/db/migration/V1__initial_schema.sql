CREATE TABLE waivers (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) DEFAULT NULL,
    parent_first_name VARCHAR(255) DEFAULT NULL,
    parent_last_name VARCHAR(255) DEFAULT NULL,
    participant_first_name VARCHAR(255) DEFAULT NULL,
    participant_last_name VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(255) DEFAULT NULL,
    signed BIT(1) NOT NULL,
    signed_at DATETIME(6) DEFAULT NULL,
    confirmation_code VARCHAR(255) DEFAULT NULL,
    active BIT(1) NOT NULL,
    expires_at DATE DEFAULT NULL,
    agreed_to_terms BIT(1) NOT NULL,

    PRIMARY KEY (id),
    CONSTRAINT uk_waivers_confirmation_code
        UNIQUE (confirmation_code)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE participants (
    id BIGINT NOT NULL AUTO_INCREMENT,
    date_of_birth DATE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    waiver_id BIGINT DEFAULT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_participants_waiver
        FOREIGN KEY (waiver_id)
        REFERENCES waivers (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci;


CREATE INDEX idx_participants_waiver_id
    ON participants (waiver_id);