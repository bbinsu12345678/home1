import Image from "next/image";

const ProcessSection = () => {
    return (
        <section className="w-full max-w-2xl mx-auto px-4">
            <Image
                src="/images/fixed/4.png"
                alt="체계적인 진행과정 - 상담요청부터 완료까지"
                width={860}
                height={1100}
                className="w-full h-auto"
                quality={75}
            />
        </section>
    );
};

export default ProcessSection;
