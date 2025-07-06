CREATE TABLE "dashboard" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "worker_id" varchar,
  "service_id" varchar,
  "payment_id" varchar,
  "name" varchar,
  "role" varchar,
  "access_level" int,
  "created_at" datetime,
  "last_login" datetime,
  "is_active" boolean
);

CREATE TABLE "users" (
  "id" varchar PRIMARY KEY,
  "name" varchar,
  "email" varchar UNIQUE,
  "phone" varchar,
  "password" varchar,
  "balance" decimal,
  "created_at" datetime,
  "status" varchar
);

CREATE TABLE "services" (
  "id" varchar PRIMARY KEY,
  "title" varchar,
  "description" text,
  "icon" varchar,
  "price" decimal,
  "is_active" boolean,
  "created_at" datetime
);

CREATE TABLE "workers" (
  "id" varchar PRIMARY KEY,
  "name" varchar,
  "email" varchar UNIQUE,
  "phone" varchar,
  "bio" text,
  "rating" float,
  "is_available" boolean,
  "balance" decimal,
  "joined_at" datetime
);

CREATE TABLE "payment" (
  "id" varchar PRIMARY KEY,
  "user_id" varchar,
  "worker_id" varchar,
  "service_id" varchar,
  "amount" decimal,
  "method" varchar,
  "status" varchar,
  "paid_at" datetime,
  "transaction_code" varchar UNIQUE
);

CREATE TABLE "service_worker" (
  "service_id" varchar,
  "worker_id" varchar
);

ALTER TABLE "dashboard" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "dashboard" ADD FOREIGN KEY ("worker_id") REFERENCES "workers" ("id");

ALTER TABLE "dashboard" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("id");

ALTER TABLE "dashboard" ADD FOREIGN KEY ("payment_id") REFERENCES "payment" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("worker_id") REFERENCES "workers" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("id");

ALTER TABLE "service_worker" ADD FOREIGN KEY ("service_id") REFERENCES "services" ("id");

ALTER TABLE "service_worker" ADD FOREIGN KEY ("worker_id") REFERENCES "workers" ("id");
