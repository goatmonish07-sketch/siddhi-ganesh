-- Optional photo per phone model (public URL, e.g. from the 'phones' storage bucket)
alter table models add column if not exists image_url text;
