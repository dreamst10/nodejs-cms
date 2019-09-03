
CREATE SEQUENCE public.type_post_type_post_id_seq_1;

CREATE TABLE public.type_post (
                type_post_id INTEGER NOT NULL DEFAULT nextval('public.type_post_type_post_id_seq_1'),
                type_post_description VARCHAR(32) NOT NULL,
                CONSTRAINT type_post_pk PRIMARY KEY (type_post_id)
);


ALTER SEQUENCE public.type_post_type_post_id_seq_1 OWNED BY public.type_post.type_post_id;

CREATE SEQUENCE public.type_user_type_user_id_seq_1;

CREATE TABLE public.type_user (
                type_user_id INTEGER NOT NULL DEFAULT nextval('public.type_user_type_user_id_seq_1'),
                type_user_description VARCHAR(64) NOT NULL,
                CONSTRAINT type_user_pk PRIMARY KEY (type_user_id)
);


ALTER SEQUENCE public.type_user_type_user_id_seq_1 OWNED BY public.type_user.type_user_id;

CREATE SEQUENCE public.type_like_type_like_id_seq_1;

CREATE TABLE public.type_like (
                type_like_id INTEGER NOT NULL DEFAULT nextval('public.type_like_type_like_id_seq_1'),
                type_like_description VARCHAR(32) NOT NULL,
                CONSTRAINT type_like_pk PRIMARY KEY (type_like_id)
);


ALTER SEQUENCE public.type_like_type_like_id_seq_1 OWNED BY public.type_like.type_like_id;

CREATE SEQUENCE public.users_user_id_seq;

CREATE TABLE public.users (
                user_id INTEGER NOT NULL DEFAULT nextval('public.users_user_id_seq'),
                user_name VARCHAR(64) NOT NULL,
                user_lastname VARCHAR(64) NOT NULL,
                user_email VARCHAR(64) NOT NULL,
                user_username VARCHAR(32) NOT NULL,
                user_password VARCHAR(128) NOT NULL,
                user_creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                user_picture VARCHAR(512) NOT NULL,
                type_user_id INTEGER DEFAULT 2 NOT NULL,
                CONSTRAINT user_pk PRIMARY KEY (user_id)
);


ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;

CREATE SEQUENCE public.follows_follow_id_seq;

CREATE TABLE public.follows (
                follow_id INTEGER NOT NULL DEFAULT nextval('public.follows_follow_id_seq'),
                user_id1 INTEGER NOT NULL,
                user_id2 INTEGER NOT NULL,
                CONSTRAINT follows_pk PRIMARY KEY (follow_id)
);


ALTER SEQUENCE public.follows_follow_id_seq OWNED BY public.follows.follow_id;

CREATE SEQUENCE public.posts_post_id_seq;

CREATE TABLE public.posts (
                post_id INTEGER NOT NULL DEFAULT nextval('public.posts_post_id_seq'),
                post_title VARCHAR(128) NOT NULL,
                post_text VARCHAR(512) NOT NULL,
                post_url VARCHAR(256) NOT NULL,
                post_creation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                user_id INTEGER NOT NULL,
                type_post_id INTEGER NOT NULL,
                CONSTRAINT posts_pk PRIMARY KEY (post_id)
);


ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;

CREATE SEQUENCE public.comments_comment_id_seq;

CREATE TABLE public.comments (
                comment_id INTEGER NOT NULL DEFAULT nextval('public.comments_comment_id_seq'),
                post_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                comment_text VARCHAR(512) NOT NULL,
                comment_url VARCHAR NOT NULL,
                CONSTRAINT comments_pk PRIMARY KEY (comment_id)
);


ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;

CREATE SEQUENCE public.likes_like_id_seq;

CREATE TABLE public.likes (
                like_id INTEGER NOT NULL DEFAULT nextval('public.likes_like_id_seq'),
                post_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                type_like_id INTEGER NOT NULL,
                CONSTRAINT likes_pk PRIMARY KEY (like_id)
);


ALTER SEQUENCE public.likes_like_id_seq OWNED BY public.likes.like_id;

ALTER TABLE public.posts ADD CONSTRAINT type_post_posts_fk
FOREIGN KEY (type_post_id)
REFERENCES public.type_post (type_post_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.users ADD CONSTRAINT type_user_users_fk
FOREIGN KEY (type_user_id)
REFERENCES public.type_user (type_user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.likes ADD CONSTRAINT type_like_likes_fk
FOREIGN KEY (type_like_id)
REFERENCES public.type_like (type_like_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.likes ADD CONSTRAINT users_likes_fk
FOREIGN KEY (user_id)
REFERENCES public.users (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comments ADD CONSTRAINT users_comments_fk
FOREIGN KEY (user_id)
REFERENCES public.users (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.posts ADD CONSTRAINT users_posts_fk
FOREIGN KEY (user_id)
REFERENCES public.users (user_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.follows ADD CONSTRAINT users_follows_fk
FOREIGN KEY (user_id1)
REFERENCES public.users (user_id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.follows ADD CONSTRAINT users_follows_fk1
FOREIGN KEY (user_id2)
REFERENCES public.users (user_id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.likes ADD CONSTRAINT posts_likes_fk
FOREIGN KEY (post_id)
REFERENCES public.posts (post_id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.comments ADD CONSTRAINT posts_comments_fk
FOREIGN KEY (post_id)
REFERENCES public.posts (post_id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;


INSERT INTO public.type_user(type_user_id, type_user_description) VALUES (1, 'admin');
INSERT INTO public.type_user(type_user_id, type_user_description) VALUES (2, 'user');

INSERT INTO public.type_like(type_like_id, type_like_description) VALUES (1, 'like');
INSERT INTO public.type_like(type_like_id, type_like_description) VALUES (2, 'dislike');

INSERT INTO public.type_post(type_post_id, type_post_description) VALUES (1, 'text');
INSERT INTO public.type_post(type_post_id, type_post_description) VALUES (2, 'picture');