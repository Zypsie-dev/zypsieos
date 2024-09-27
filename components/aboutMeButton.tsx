import { Image } from "@nextui-org/image";

import AboutMe from "./aboutme";

import { useWindowContext } from "@/Context/windowContext"; 

export default function Icon() {
    const { addWindow } = useWindowContext();
    
    return (
        <Image
        alt="About Me"
        height={40}
            src="/icons/dock/aboutme.svg"
            width={40}
            onClick={() => addWindow('aboutme', <AboutMe />, 600, 400)}
        />
    );
}

