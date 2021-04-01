import React from 'react';
import { Warning } from '../../../index';
import { storiesOf } from '@storybook/react';

storiesOf('Typography', module).add('Warning', () => (
    <Warning>Warning! Here dragons abound. 🐲</Warning>
));
