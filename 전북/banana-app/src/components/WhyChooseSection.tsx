import Image from "next/image";

const WhyChooseSection = () => {
    return (
        <section className="w-full max-w-2xl mx-auto px-4">
            <Image
                src="/images/fixed/3.png"
                alt="바나나배관을 선택해야 하는 이유"
                width={860}
                height={1100}
                className="w-full h-auto"
                quality={75}
            />
        </section>
    );
};

export default WhyChooseSection;
