
CREATE TABLE "users_roles" (
    "usersId" uuid NOT NULL,
    "rolesId" uuid NOT NULL,

    CONSTRAINT "PK_users_roles" PRIMARY KEY ("usersId", "rolesId"),

    CONSTRAINT "FK_users_roles_user"
        FOREIGN KEY ("usersId") REFERENCES "users"("id")
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT "FK_users_roles_role"
        FOREIGN KEY ("rolesId") REFERENCES "roles"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);