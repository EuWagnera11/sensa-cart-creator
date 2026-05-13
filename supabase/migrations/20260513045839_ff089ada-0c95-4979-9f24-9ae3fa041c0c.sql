CREATE TABLE public.wishlist_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_handle TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_handle)
);

CREATE INDEX wishlist_items_user_id_idx ON public.wishlist_items(user_id);
CREATE INDEX wishlist_items_user_handle_idx ON public.wishlist_items(user_id, product_handle);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own wishlist"
  ON public.wishlist_items FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users add to own wishlist"
  ON public.wishlist_items FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete from own wishlist"
  ON public.wishlist_items FOR DELETE TO authenticated
  USING (auth.uid() = user_id);