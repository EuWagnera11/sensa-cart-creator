import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import AnnounceBanner from "@/components/AnnounceBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type Order = {
  id: string;
  status: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  created_at: string;
};

const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  pending: { icon: <Clock size={16} />, label: "Pending", color: "text-accent" },
  processing: { icon: <Package size={16} />, label: "Processing", color: "text-neon-orange" },
  shipped: { icon: <Truck size={16} />, label: "Shipped", color: "text-neon-blue" },
  delivered: { icon: <CheckCircle size={16} />, label: "Delivered", color: "text-neon-mint" },
  cancelled: { icon: <XCircle size={16} />, label: "Cancelled", color: "text-primary" },
};

const OrdersPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      setOrders((data as Order[]) || []);
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (authLoading || loading) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch">
          <div className="font-display italic text-xl text-muted-foreground animate-pulse">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center bg-parch paper-bg">
          <div className="text-center px-6">
            <span className="text-6xl block mb-4">🔒</span>
            <h1 className="font-display font-black italic text-3xl text-foreground mb-2">Sign in to view orders</h1>
            <p className="font-serif italic text-muted-foreground mb-6">Your order history is waiting for you.</p>
            <Link to="/auth" className="cta-primary inline-block no-underline px-8 py-3">Sign In →</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      <section className="bg-parch paper-bg px-4 sm:px-6 py-8 sm:py-12 lg:px-12 lg:py-16 border-b-[3px] border-dark">
        <div className="max-w-[1440px] mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-display italic text-muted-foreground no-underline hover:text-primary transition-colors mb-4 sm:mb-6">
            <ArrowLeft size={16} /> Back to shop
          </Link>
          <p className="section-kicker text-primary mb-3">Order History</p>
          <h1 className="font-display font-black italic text-foreground leading-none" style={{ fontSize: "clamp(1.8rem,4vw,4.5rem)" }}>
            Your secret purchases.
          </h1>
        </div>
      </section>

      <section className="bg-background paper-bg px-4 sm:px-6 py-8 sm:py-10 lg:px-12 lg:py-16">
        <div className="max-w-[900px] mx-auto">
          {orders.length === 0 ? (
            <div className="surface-card rounded-[28px] p-10 text-center">
              <div className="w-24 h-24 rounded-full border-[3px] border-dark bg-surface mx-auto mb-5 flex items-center justify-center text-5xl shadow-soft">📦</div>
              <h2 className="font-display font-black italic text-3xl text-foreground">No orders yet.</h2>
              <p className="font-serif italic text-muted-foreground max-w-[420px] mx-auto mt-4 leading-7">
                Once you place your first order, it will appear here with full tracking and details.
              </p>
              <Link to="/products" className="cta-primary mt-6 no-underline inline-block">Start shopping →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.pending;
                return (
                  <div key={order.id} className="surface-card rounded-[20px] sm:rounded-[28px] p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="text-[0.68rem] uppercase tracking-[3px] text-muted-foreground mb-1">Order</p>
                        <p className="font-display italic font-bold text-foreground text-sm">#{order.id.slice(0, 8)}</p>
                      </div>
                      <div className={`flex items-center gap-2 ${config.color} font-display italic font-bold text-sm`}>
                        {config.icon}
                        {config.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t-2 border-dark/10 pt-4">
                      <div>
                        <div className="text-[0.62rem] uppercase tracking-[2px] text-muted-foreground mb-1">Date</div>
                        <div className="font-display italic text-sm text-foreground">
                          {new Date(order.created_at).toLocaleDateString("pt-PT")}
                        </div>
                      </div>
                      <div>
                        <div className="text-[0.62rem] uppercase tracking-[2px] text-muted-foreground mb-1">Subtotal</div>
                        <div className="font-display italic text-sm text-foreground">€{Number(order.subtotal).toFixed(2)}</div>
                      </div>
                      {order.discount > 0 && (
                        <div>
                          <div className="text-[0.62rem] uppercase tracking-[2px] text-muted-foreground mb-1">Discount</div>
                          <div className="font-display italic text-sm text-accent">-€{Number(order.discount).toFixed(2)}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-[0.62rem] uppercase tracking-[2px] text-muted-foreground mb-1">Total</div>
                        <div className="font-display font-black text-lg text-primary">€{Number(order.total).toFixed(2)}</div>
                      </div>
                    </div>

                    {order.coupon_code && (
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-accent/20 px-3 py-1 rounded-full">
                        <span className="text-[0.65rem] font-display italic font-bold text-foreground/70">Coupon: {order.coupon_code}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OrdersPage;
