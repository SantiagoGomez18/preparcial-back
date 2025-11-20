CREATE TABLE "appointments" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "id_user" uuid NOT NULL,
    "appointment_date" timestamp NOT NULL,
    "reason" varchar NOT NULL,
    "status" varchar NOT NULL DEFAULT 'scheduled',
    CONSTRAINT "PK_appointments_id" PRIMARY KEY ("id"),
    CONSTRAINT "FK_appointments_user" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE
);