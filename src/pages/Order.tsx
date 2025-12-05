import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../components/commons/Title";
import { BasketStyle } from "./Basket"; // BasketStyle이 import 됨
import BasketSummary from "../components/basket/BasketSummary";
import Button from "../components/commons/Button";
import InputText from "../components/commons/inputText";
import { useForm } from "react-hook-form";
import { DeliveryInfo, OrderSheet } from "../models/order.model";
import FindAddressButton from "../components/order/FindAddressButton";
import { useAlert } from "../hooks/useAlert";
import { order } from "../apis/order.api";
import { useAuth } from "../hooks/useAuth";

interface DeliveryForm extends DeliveryInfo {
  addressDetail: string;
}

const Order = () => {
  const { userGetMyInfo } = useAuth();
  const { showAlert, showConfirm } = useAlert();
  const location = useLocation();
  const navigate = useNavigate();
  const orderDataFromBasket = location.state;
  const { totalQuantity, totalPrice, firstBookTitle, items } =
    orderDataFromBasket;

  const [useDefaultAddress, setUseDefaultAddress] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  const handleSetDefaultAddress = async () => {
    setUseDefaultAddress(true);
    const response = await userGetMyInfo();
    const userInfo = response.user;

    setValue("recipient", userInfo.name, { shouldValidate: true });
    setValue("phone", userInfo.phone_number || "", { shouldValidate: true });
    setValue("address", userInfo.address || "", { shouldValidate: true });
    setValue("addressDetail", "");
  };

  const handleSetCustomAddress = () => {
    setUseDefaultAddress(false);
    setValue("recipient", "");
    setValue("phone", "");
    setValue("address", "");
    setValue("addressDetail", "");
  };

  const handleFindAddress = (address: string) => {
    setValue("address", address);
  };

  const handlePay = (data: DeliveryForm) => {
    let orderData: OrderSheet;

    if (useDefaultAddress) {
      orderData = {
        cart_item_ids: items,
        use_default_address: true,
      };
    } else {
      orderData = {
        cart_item_ids: items,
        use_default_address: false,
        delivery_info: {
          recipient: data.recipient,
          address: `${data.address} ${data.addressDetail}`,
          phone: data.phone,
        },
      };
    }

    showConfirm("주문을 진행하시겠습니까?", () => {
      order(orderData).then(() => {
        showAlert("주문이 처리되었습니다.");
        navigate("/orderlist");
      });
    });
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <BasketStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <Button
                size="medium"
                scheme={useDefaultAddress ? "primary" : "normal"}
                onClick={handleSetDefaultAddress}
              >
                기본 배송지
              </Button>
              <Button
                size="medium"
                scheme={!useDefaultAddress ? "primary" : "normal"}
                onClick={handleSetCustomAddress}
              >
                직접 입력
              </Button>
            </div>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("address", { required: true })}
                    readOnly={useDefaultAddress}
                  />
                </div>
                {!useDefaultAddress && (
                  <FindAddressButton onCompleted={handleFindAddress} />
                )}
                {errors.address && (
                  <p className="error-text">주소를 입력해 주세요</p>
                )}
              </fieldset>

              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("addressDetail")}
                    readOnly={false} // Always editable
                  />
                </div>
                {errors.addressDetail && (
                  <p className="error-text">상세 주소를 입력해 주세요</p>
                )}
              </fieldset>

              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("recipient", { required: true })}
                    readOnly={useDefaultAddress}
                  />
                </div>
                {errors.recipient && (
                  <p className="error-text">수령인을 입력해 주세요</p>
                )}
              </fieldset>

              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register("phone", { required: true })}
                    readOnly={useDefaultAddress}
                  />
                </div>
                {errors.phone && (
                  <p className="error-text">전화번호를 입력해 주세요</p>
                )}
              </fieldset>
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {firstBookTitle} 등 총 {totalQuantity}권
            </strong>
          </div>
        </div>
        <div className="summary">
          <BasketSummary
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
          />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </BasketStyle>
    </>
  );
};

export default Order;
