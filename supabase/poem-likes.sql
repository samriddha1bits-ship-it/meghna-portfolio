create table if not exists public.poem_likes (
  poem_id text primary key,
  likes integer not null default 0 check (likes >= 0)
);

alter table public.poem_likes enable row level security;

drop policy if exists "Anyone can read poem likes" on public.poem_likes;
create policy "Anyone can read poem likes"
  on public.poem_likes for select to anon, authenticated using (true);
grant select on public.poem_likes to anon, authenticated;

insert into public.poem_likes (poem_id, likes) values
  ('solitude-haven', 14),
  ('ask-the-moon', 14),
  ('a-tapestry-anew', 14),
  ('in-the-darkest-veil', 14)
on conflict (poem_id) do nothing;

create or replace function public.increment_poem_like(p_poem_id text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  if p_poem_id not in ('solitude-haven', 'ask-the-moon', 'a-tapestry-anew', 'in-the-darkest-veil') then
    raise exception 'Unknown poem';
  end if;

  insert into public.poem_likes (poem_id, likes)
  values (p_poem_id, 15)
  on conflict (poem_id) do update set likes = poem_likes.likes + 1
  returning likes into updated_count;

  return updated_count;
end;
$$;

revoke all on function public.increment_poem_like(text) from public;
grant execute on function public.increment_poem_like(text) to anon, authenticated;
