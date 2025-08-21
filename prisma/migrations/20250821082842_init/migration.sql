-- CreateTable
CREATE TABLE "public"."music" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "artist" VARCHAR(255) NOT NULL,
    "duration" INTEGER,
    "url" TEXT NOT NULL,
    "created_at" TIMETZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."playlist_music" (
    "playlist_id" INTEGER NOT NULL,
    "music_id" INTEGER NOT NULL,

    CONSTRAINT "playlist_music_pkey" PRIMARY KEY ("music_id","playlist_id")
);

-- CreateTable
CREATE TABLE "public"."playlists" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMETZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "playlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."roles" (
    "id" SERIAL NOT NULL,
    "roles" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN DEFAULT true,
    "role" INTEGER DEFAULT 1,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."music" ADD CONSTRAINT "user_fr" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."playlist_music" ADD CONSTRAINT "music_Fr" FOREIGN KEY ("music_id") REFERENCES "public"."music"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."playlist_music" ADD CONSTRAINT "playlist_fr" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."playlists" ADD CONSTRAINT "user_id_fr" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "role_fr" FOREIGN KEY ("role") REFERENCES "public"."roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
