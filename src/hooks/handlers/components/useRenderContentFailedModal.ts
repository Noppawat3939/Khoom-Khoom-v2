import { useGetContentByLocale } from "@/hooks";
import { useLocaleStore } from "@/stores";
import { _string } from "@/utils";

const useRenderContentFailedModal = () => {
  const { locale } = useLocaleStore((store) => ({ locale: store.locale }));
  const { data: content } = useGetContentByLocale(locale);

  const failedContent = {
    title: _string(content?.failed_modal.title),
    description: _string(content?.failed_modal.description),
  };

  return { content: failedContent };
};

export default useRenderContentFailedModal;
