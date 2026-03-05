import Image from "next/image";

const ReviewSection = () => {
    return (
        <section className="w-full max-w-2xl mx-auto px-4">
            <Image
                src="/images/fixed/5.png"
                alt="고객 후기 - 만족도 100%"
                width={860}
                height={1100}
                className="w-full h-auto"
                quality={75}
            />
        </section>
    );
};

export default ReviewSection;
