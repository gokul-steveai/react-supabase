-- Update handle_new_user function to set status on signup
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
  begin
    insert into public.users (id, username, status)
    values (new.id, new.email, 'ONLINE');

    if position('+supaadmin@' in new.email) > 0 then
      insert into public.user_roles (user_id, role) values (new.id, 'admin');
    elsif position('+supamod@' in new.email) > 0 then
      insert into public.user_roles (user_id, role) values (new.id, 'moderator');
    end if;

    return new;
  end;
$$ language plpgsql security definer;
