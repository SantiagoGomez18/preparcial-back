
CREATE TABLE "roles" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "role_name" varchar NOT NULL UNIQUE,
    "description" varchar DEFAULT '',
    CONSTRAINT "PK_roles_id" PRIMARY KEY ("id")
);
