create type "public"."app_permission" as enum ('channels.delete', 'messages.delete');

create type "public"."app_role" as enum ('admin', 'moderator');

create type "public"."user_status" as enum ('ONLINE', 'OFFLINE');


  create table "public"."channels" (
    "id" uuid not null default gen_random_uuid(),
    "inserted_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "slug" text not null,
    "created_by" uuid not null
      );


alter table "public"."channels" enable row level security;


  create table "public"."messages" (
    "id" uuid not null default gen_random_uuid(),
    "inserted_at" timestamp with time zone not null default timezone('utc'::text, now()),
    "message" text,
    "user_id" uuid not null,
    "channel_id" uuid not null
      );


alter table "public"."messages" enable row level security;


  create table "public"."role_permissions" (
    "id" uuid not null default gen_random_uuid(),
    "role" public.app_role not null,
    "permission" public.app_permission not null
      );


alter table "public"."role_permissions" enable row level security;


  create table "public"."user_roles" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "role" public.app_role not null
      );


alter table "public"."user_roles" enable row level security;


  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "username" text,
    "status" public.user_status default 'OFFLINE'::public.user_status
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX channels_pkey ON public.channels USING btree (id);

CREATE UNIQUE INDEX channels_slug_key ON public.channels USING btree (slug);

CREATE UNIQUE INDEX messages_pkey ON public.messages USING btree (id);

CREATE UNIQUE INDEX role_permissions_pkey ON public.role_permissions USING btree (id);

CREATE UNIQUE INDEX role_permissions_role_permission_key ON public.role_permissions USING btree (role, permission);

CREATE UNIQUE INDEX user_roles_pkey ON public.user_roles USING btree (id);

CREATE UNIQUE INDEX user_roles_user_id_role_key ON public.user_roles USING btree (user_id, role);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."channels" add constraint "channels_pkey" PRIMARY KEY using index "channels_pkey";

alter table "public"."messages" add constraint "messages_pkey" PRIMARY KEY using index "messages_pkey";

alter table "public"."role_permissions" add constraint "role_permissions_pkey" PRIMARY KEY using index "role_permissions_pkey";

alter table "public"."user_roles" add constraint "user_roles_pkey" PRIMARY KEY using index "user_roles_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."channels" add constraint "channels_created_by_fkey" FOREIGN KEY (created_by) REFERENCES public.users(id) not valid;

alter table "public"."channels" validate constraint "channels_created_by_fkey";

alter table "public"."channels" add constraint "channels_slug_key" UNIQUE using index "channels_slug_key";

alter table "public"."messages" add constraint "messages_channel_id_fkey" FOREIGN KEY (channel_id) REFERENCES public.channels(id) ON DELETE CASCADE not valid;

alter table "public"."messages" validate constraint "messages_channel_id_fkey";

alter table "public"."messages" add constraint "messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) not valid;

alter table "public"."messages" validate constraint "messages_user_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_permission_key" UNIQUE using index "role_permissions_role_permission_key";

alter table "public"."user_roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "user_roles_user_id_fkey";

alter table "public"."user_roles" add constraint "user_roles_user_id_role_key" UNIQUE using index "user_roles_user_id_role_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.authorize(requested_permission public.app_permission, user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
  declare
    bind_permissions int;
  begin
    select
      count(*)
    from public.role_permissions
    inner join public.user_roles on role_permissions.role = user_roles.role
    where
      role_permissions.permission = authorize.requested_permission and
      user_roles.user_id = authorize.user_id
    into bind_permissions;

    return bind_permissions > 0;
  end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  declare is_admin boolean;
  begin
    insert into public.users (id, username)
    values (new.id, new.email);

    select count(*) = 1 from auth.users into is_admin;

    if position('+supaadmin@' in new.email) > 0 then
      insert into public.user_roles (user_id, role) values (new.id, 'admin');
    elsif position('+supamod@' in new.email) > 0 then
      insert into public.user_roles (user_id, role) values (new.id, 'moderator');
    end if;

    return new;
  end;
$function$
;

grant delete on table "public"."channels" to "anon";

grant insert on table "public"."channels" to "anon";

grant references on table "public"."channels" to "anon";

grant select on table "public"."channels" to "anon";

grant trigger on table "public"."channels" to "anon";

grant truncate on table "public"."channels" to "anon";

grant update on table "public"."channels" to "anon";

grant delete on table "public"."channels" to "authenticated";

grant insert on table "public"."channels" to "authenticated";

grant references on table "public"."channels" to "authenticated";

grant select on table "public"."channels" to "authenticated";

grant trigger on table "public"."channels" to "authenticated";

grant truncate on table "public"."channels" to "authenticated";

grant update on table "public"."channels" to "authenticated";

grant delete on table "public"."channels" to "service_role";

grant insert on table "public"."channels" to "service_role";

grant references on table "public"."channels" to "service_role";

grant select on table "public"."channels" to "service_role";

grant trigger on table "public"."channels" to "service_role";

grant truncate on table "public"."channels" to "service_role";

grant update on table "public"."channels" to "service_role";

grant delete on table "public"."messages" to "anon";

grant insert on table "public"."messages" to "anon";

grant references on table "public"."messages" to "anon";

grant select on table "public"."messages" to "anon";

grant trigger on table "public"."messages" to "anon";

grant truncate on table "public"."messages" to "anon";

grant update on table "public"."messages" to "anon";

grant delete on table "public"."messages" to "authenticated";

grant insert on table "public"."messages" to "authenticated";

grant references on table "public"."messages" to "authenticated";

grant select on table "public"."messages" to "authenticated";

grant trigger on table "public"."messages" to "authenticated";

grant truncate on table "public"."messages" to "authenticated";

grant update on table "public"."messages" to "authenticated";

grant delete on table "public"."messages" to "service_role";

grant insert on table "public"."messages" to "service_role";

grant references on table "public"."messages" to "service_role";

grant select on table "public"."messages" to "service_role";

grant trigger on table "public"."messages" to "service_role";

grant truncate on table "public"."messages" to "service_role";

grant update on table "public"."messages" to "service_role";

grant delete on table "public"."role_permissions" to "anon";

grant insert on table "public"."role_permissions" to "anon";

grant references on table "public"."role_permissions" to "anon";

grant select on table "public"."role_permissions" to "anon";

grant trigger on table "public"."role_permissions" to "anon";

grant truncate on table "public"."role_permissions" to "anon";

grant update on table "public"."role_permissions" to "anon";

grant delete on table "public"."role_permissions" to "authenticated";

grant insert on table "public"."role_permissions" to "authenticated";

grant references on table "public"."role_permissions" to "authenticated";

grant select on table "public"."role_permissions" to "authenticated";

grant trigger on table "public"."role_permissions" to "authenticated";

grant truncate on table "public"."role_permissions" to "authenticated";

grant update on table "public"."role_permissions" to "authenticated";

grant delete on table "public"."role_permissions" to "service_role";

grant insert on table "public"."role_permissions" to "service_role";

grant references on table "public"."role_permissions" to "service_role";

grant select on table "public"."role_permissions" to "service_role";

grant trigger on table "public"."role_permissions" to "service_role";

grant truncate on table "public"."role_permissions" to "service_role";

grant update on table "public"."role_permissions" to "service_role";

grant delete on table "public"."user_roles" to "anon";

grant insert on table "public"."user_roles" to "anon";

grant references on table "public"."user_roles" to "anon";

grant select on table "public"."user_roles" to "anon";

grant trigger on table "public"."user_roles" to "anon";

grant truncate on table "public"."user_roles" to "anon";

grant update on table "public"."user_roles" to "anon";

grant delete on table "public"."user_roles" to "authenticated";

grant insert on table "public"."user_roles" to "authenticated";

grant references on table "public"."user_roles" to "authenticated";

grant select on table "public"."user_roles" to "authenticated";

grant trigger on table "public"."user_roles" to "authenticated";

grant truncate on table "public"."user_roles" to "authenticated";

grant update on table "public"."user_roles" to "authenticated";

grant delete on table "public"."user_roles" to "service_role";

grant insert on table "public"."user_roles" to "service_role";

grant references on table "public"."user_roles" to "service_role";

grant select on table "public"."user_roles" to "service_role";

grant trigger on table "public"."user_roles" to "service_role";

grant truncate on table "public"."user_roles" to "service_role";

grant update on table "public"."user_roles" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "Allow authorized delete access"
  on "public"."channels"
  as permissive
  for delete
  to public
using (public.authorize('channels.delete'::public.app_permission, auth.uid()));



  create policy "Allow individual delete access"
  on "public"."channels"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = created_by));



  create policy "Allow individual insert access"
  on "public"."channels"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = created_by));



  create policy "Allow logged-in read access"
  on "public"."channels"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow authorized delete access"
  on "public"."messages"
  as permissive
  for delete
  to public
using (public.authorize('messages.delete'::public.app_permission, auth.uid()));



  create policy "Allow individual delete access"
  on "public"."messages"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Allow individual insert access"
  on "public"."messages"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Allow individual update access"
  on "public"."messages"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Allow logged-in read access"
  on "public"."messages"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));



  create policy "Allow individual read access"
  on "public"."user_roles"
  as permissive
  for select
  to public
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Allow individual insert access"
  on "public"."users"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = id));



  create policy "Allow individual update access"
  on "public"."users"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = id));



  create policy "Allow logged-in read access"
  on "public"."users"
  as permissive
  for select
  to public
using ((auth.role() = 'authenticated'::text));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


