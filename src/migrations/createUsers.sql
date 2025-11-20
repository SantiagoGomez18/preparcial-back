
CREATE TABLE "users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "email" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "name" varchar NOT NULL,
    "phone" integer,
    "is_active" boolean DEFAULT true,
    "created_at" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
);