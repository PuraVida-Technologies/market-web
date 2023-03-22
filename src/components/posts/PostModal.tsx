import { IPost } from '@/types/IPost';
import useWindowSize from '@/utils/hooks/useWindowSize';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Carousel, Modal, ModalProps, Spin } from 'antd';
import Image from 'next/image';

interface PostModalProps extends ModalProps {
  post: IPost;
  loadingPost: boolean;
}

const PostModal = (props: PostModalProps) => {
  const { post, loadingPost } = props;
  const [windowWidth] = useWindowSize();
  const isMobile = windowWidth <= 426;
  // console.log({ windowWidth });
  return (
    <Modal
      {...props}
      closable
      destroyOnClose
      footer={null}
      centered={!isMobile}
      width={isMobile ? '100vw' : '400px'}
      className="[&>[class='ant-modal-content']]:p-0 max-w-[100%] top-0 sm:min-h-fit pb-0"
      bodyStyle={
        isMobile
          ? {
              minHeight: '100vh',
              overflow: 'hidden',
              placeContent: 'center',
              display: loadingPost ? 'grid' : 'block',
            }
          : {
              minHeight: '70vh',
              borderRadius: '8px',
              overflow: 'hidden',
              placeContent: 'center',
              display: loadingPost ? 'grid' : 'block',
            }
      }
      closeIcon={
        <Button
          size="small"
          shape="circle"
          className="grid place-content-center"
        >
          <CloseOutlined />
        </Button>
      }
    >
      {loadingPost && (
        <Spin className="w-full h-60 grid place-content-center" />
      )}
      <section>
        <Carousel
          className="border-b border-gray-light"
          dots={{
            className:
              'bg-white p-1 align-middle w-min mx-auto rounded-lg [&>[class="slick-active"]_button]:bg-primary [&>:not([class="slick-active"])_button]:bg-primary [class="slick-active"]_button]:rounded [&>:not([class="slick-active"])_button]:rounded',
          }}
        >
          {post?.imagesUrls?.length && !loadingPost ? (
            post?.imagesUrls?.map((image) => (
              <div
                key={image}
                className="relative w-full sm:w-[400px] h-[300px] sm:rounded-lg"
              >
                <Image
                  alt=""
                  src={image}
                  fill
                  className="object-cover object-center w-full h-full align-middle sm:rounded-t-lg"
                />
              </div>
            ))
          ) : (
            <div className="relative w-full sm:w-[400px] h-[300px] sm:rounded-lg">
              <Image
                alt=""
                src={post?.mainImageUrl}
                fill
                className="object-cover object-center w-full h-full align-middle sm:rounded-t-lg"
              />
            </div>
          )}
        </Carousel>
        <section className="p-6 h-[calc(100%-268px)] flex flex-col gap-6">
          <section className="flex justify-between">
            <section>
              <h1 className="capitalize font-medium text-2xl">
                {post?.name.slice(0, 20)}
              </h1>
              <p className="capitalize text-xs text-gray-text">
                {post?.address}
              </p>
            </section>
            <Button type="primary" className="flex gap-1 items-center">
              Location
              <Image width={18} height={18} alt="" src="/assets/location.svg" />
            </Button>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="font-medium">Description</h2>
            <p className="text-gray-text text-sm leading-[22px] text-justify">
              {post?.description}
            </p>
          </section>
        </section>
      </section>
    </Modal>
  );
};

export default PostModal;
