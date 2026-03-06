drop policy "Allow public read users" on "public"."users";


  create policy "Allow authenticated read"
  on "public"."users"
  as permissive
  for select
  to authenticated
using (true);



