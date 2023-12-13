import { useGetContents } from "@/hooks";
import { _string } from "@/utils";

const useRenderContentFailedModal = () => {
  const { data: content } = useGetContents();

  const failedContent = {
    title: _string(content?.failed_modal.title),
    description: _string(content?.failed_modal.description),
  };

  return { content: failedContent };
};

export default useRenderContentFailedModal;
