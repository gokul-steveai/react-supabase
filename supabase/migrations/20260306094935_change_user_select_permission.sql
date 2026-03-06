
create policy "Allow public read users"
on users
for select
to anon
using (true);

-- create policy "Allow logged in users"
-- on users
-- for select
-- to authenticated
-- using (true);



