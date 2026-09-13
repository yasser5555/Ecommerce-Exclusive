import { PageTitle, useChangeTitle } from "../../../shared/Utils/useChangeTitle";
import { useAuth } from "../../auth/hooks/useAuth";
import CartSummary from "../Component/Cart-Summary";
import CartTable from "../Component/Cart-table";
import Coupon from "../Component/Coupon";
 

export default function CartPage() {
  const { user } = useAuth();
  useChangeTitle({ title: "Shopping Cart " });

  return (
    <>
     
    
      <main className="bg-white min-vh-100 py-4 py-md-5">
        <div className="container">
          <CartTable userId={user?.id} />

          <div className="row g-4 mt-4 gap-4 d-flex flex-row-reverse">
            <CartSummary />
            <Coupon />
          </div>
        </div>
      </main>
    </>
  );
}