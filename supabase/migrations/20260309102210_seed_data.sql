-- Seed data for users, channels and messages

-- Insert users
insert into public.users (id, username, status)
values
    ('a1b2c3d4-0000-0000-0000-000000000001', 'alice', 'ONLINE'),
    ('a1b2c3d4-0000-0000-0000-000000000002', 'bob', 'OFFLINE'),
    ('a1b2c3d4-0000-0000-0000-000000000003', 'charlie', 'ONLINE');

-- Insert user roles
insert into public.user_roles (user_id, role)
values
    ('a1b2c3d4-0000-0000-0000-000000000001', 'admin'),
    ('a1b2c3d4-0000-0000-0000-000000000002', 'moderator');

-- Insert role permissions
insert into public.role_permissions (role, permission)
values
    ('admin', 'channels.delete'),
    ('admin', 'messages.delete'),
    ('moderator', 'messages.delete');

-- Insert channels
insert into public.channels (id, slug, created_by)
values
    ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'general', 'a1b2c3d4-0000-0000-0000-000000000001'),
    ('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'tech-talk', 'a1b2c3d4-0000-0000-0000-000000000002'),
    ('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'announcements', 'a1b2c3d4-0000-0000-0000-000000000003');

-- Insert messages
insert into public.messages (channel_id, user_id, message)
values
    ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'a1b2c3d4-0000-0000-0000-000000000001', 'Welcome to the general channel!'),
    ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'a1b2c3d4-0000-0000-0000-000000000002', 'Feel free to discuss anything here.'),
    ('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'a1b2c3d4-0000-0000-0000-000000000002', 'Let''s talk about the latest tech trends!'),
    ('b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e', 'a1b2c3d4-0000-0000-0000-000000000003', 'Anyone working with Supabase?'),
    ('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'a1b2c3d4-0000-0000-0000-000000000003', 'Important updates will be posted here.'),
    ('c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f', 'a1b2c3d4-0000-0000-0000-000000000001', 'Stay tuned for more announcements!');