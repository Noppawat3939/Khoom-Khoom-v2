"use client";

import { Button } from "@/components";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import ThumbUpImage from "@/assets/png/thumb-up.png";
import EqualImage from "@/assets/png/equal.png";
import Image from "next/image";
import { ACTIVE_MODAL, VARIABLE_CONTENT } from "@/constants";
import { useCompareProducts } from "@/hooks";

const CompareProductModal = () => {
  const {
    state: { open, data, productCount, content },
    action,
  } = useCompareProducts();

  if (open !== ACTIVE_MODAL.COMPARE_PRODUCT) return null;

  return (
    <Modal
      isOpen={open === ACTIVE_MODAL.COMPARE_PRODUCT}
      hideCloseButton
      isDismissable={false}
      shadow="lg"
      size="xl"
    >
      <ModalContent className="m-3">
        <ModalBody>
          <Image
            loading="lazy"
            alt="thumb-up-image"
            className="mt-2 object-cover w-[100px] h-[100px] max-md:w-[80px] max-md:h-[80px] mx-auto"
            src={productCount.hasEqual ? EqualImage : ThumbUpImage}
          />
          {productCount.hasOne &&
            data.data?.map((data) => (
              <ModalHeader
                key={data.id}
                className="justify-center p-0 flex flex-col items-center text-2xl max-md:text-xl"
              >
                {`"${data.productName}"`}
                <p className="text-[16px] font-normal">
                  {content.size.replaceAll(VARIABLE_CONTENT, data.size)}
                </p>
                <span className="mt-2 text-xl max-md:text-lg font-normal">
                  {content.title}
                </span>
              </ModalHeader>
            ))}
          {productCount.hasMoreThanOne && (
            <div className="flex flex-col w-full item-center">
              <div className="flex space-x-2 justify-center">
                {data.data?.map((data) => (
                  <ModalHeader
                    key={data.id}
                    className="p-0 text-2xl max-md:text-xl"
                  >
                    {data.productName}
                  </ModalHeader>
                ))}
              </div>
              <span className="text-center mt-2 text-xl max-md:text-lg font-normal">
                {content.title}
              </span>
            </div>
          )}
          {productCount.hasEqual && (
            <div className="flex flex-col w-full item-center">
              <div className="flex space-x-2 justify-center">
                {data.data?.map((data) => (
                  <ModalHeader
                    className="p-0 text-2xl max-md:text-xl"
                    key={data.id}
                  >
                    {data.productName}
                  </ModalHeader>
                ))}
              </div>
              <span className="text-center mt-2 text-xl max-md:text-lg font-normal">
                {content.title}
              </span>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            about="close-modal-btn"
            size="lg"
            variant="ghost"
            className="mx-auto"
            onClick={action.handleCloseModal}
          >
            {content.close_btn}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CompareProductModal;
