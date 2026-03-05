import Image from "next/image";

const ContactSection = () => {
    return (
        <section className="w-full max-w-2xl mx-auto px-4">
            <Image
                src="/images/fixed/6.png"
                alt="고객센터 - 24시간 연중무휴 상담"
                width={860}
                height={1100}
                className="w-full h-auto"
                quality={75}
            />
        </section>
    );
};

export default ContactSection;
