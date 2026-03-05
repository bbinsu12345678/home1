import Image from "next/image";

const IntroSection = () => {
    return (
        <section className="w-full max-w-2xl mx-auto px-4">
            <Image
                src="/images/fixed/2.png"
                alt="각종막힘, 걱정 끝! - 바나나배관"
                width={860}
                height={1100}
                className="w-full h-auto"
                quality={75}
            />
        </section>
    );
};

export default IntroSection;
