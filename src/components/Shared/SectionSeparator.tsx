import React from 'react';
import tw from 'twin.macro';
import { styled } from '../../../stitches.config';

const SectionSeparatorSt = styled('hr', tw`border-accent-2 mt-28 mb-24`);

const SectionSeparator: React.FC = () => <SectionSeparatorSt />;

export default SectionSeparator;
