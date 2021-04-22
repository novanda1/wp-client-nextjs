import tw from "twin.macro";
import { styled } from "../../stitches.config";

const SectionSeparatorSt = styled("hr", tw`border-accent-2 mt-28 mb-24`);

const SectionSeparator = () => <SectionSeparatorSt />;

export default SectionSeparator;
