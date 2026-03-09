-- Function to update user status
create or replace function public.update_user_status(user_id uuid, new_status user_status)
returns void
language plpgsql
security definer
as $$
begin
  update public.users
  set status = new_status
  where id = user_id;
end;
$$;

-- Grant execute permission
grant execute on function public.update_user_status(uuid, user_status) to authenticated;
