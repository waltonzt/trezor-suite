import React from 'react';
import styled, { css } from 'styled-components';
import { resolveStaticPath } from '@suite-utils/nextjs';

// const PNG_IMAGES = {
//     // 3D: "3D.png",
//     // 3D_2x: require(`images/3d-icons/3D@2x.png`),
//     // 3D_3x: require(`images/3d-icons/3D@3x.png`),
//     BACKUP: require(`images/3d-icons/Backup.png`),
//     BACKUP_2x: require(`images/3d-icons/Backup@2x.png`),
//     BACKUP_3x: require(`images/3d-icons/Backup@3x.png`),
//     CHECK: require(`images/3d-icons/Check.png`),
//     CHECK_2x: require(`images/3d-icons/Check@2x.png`),
//     CHECK_3x: require(`images/3d-icons/Check@3x.png`),
//     CLOCK: require(`images/3d-icons/Clock.png`),
//     CLOCK_2x: require(`images/3d-icons/Clock@2x.png`),
//     CLOCK_3x: require(`images/3d-icons/Clock@3x.png`),
//     COINS: require(`images/3d-icons/Coins.png`),
//     COINS_2x: require(`images/3d-icons/Coins@2x.png`),
//     COINS_3x: require(`images/3d-icons/Coins@3x.png`),
//     ERROR: require(`images/3d-icons/Error.png`),
//     ERROR_2x: require(`images/3d-icons/Error@2x.png`),
//     ERROR_3x: require(`images/3d-icons/Error@3x.png`),
//     EXTRA_INFO: require(`images/3d-icons/ExtraInfo.png`),
//     EXTRA_INFO_2x: require(`images/3d-icons/ExtraInfo@2x.png`),
//     EXTRA_INFO_3x: require(`images/3d-icons/ExtraInfo@3x.png`),
//     FIRMWARE: require(`images/3d-icons/Firmware.png`),
//     FIRMWARE_2x: require(`images/3d-icons/Firmware@2x.png`),
//     FIRMWARE_3x: require(`images/3d-icons/Firmware@3x.png`),
//     FOLDER: require(`images/3d-icons/Folder.png`),
//     FOLDER_2x: require(`images/3d-icons/Folder@2x.png`),
//     FOLDER_3x: require(`images/3d-icons/Folder@3x.png`),
//     KEY: require(`images/3d-icons/Key.png`),
//     KEY_2x: require(`images/3d-icons/Key@2x.png`),
//     KEY_3x: require(`images/3d-icons/Key@3x.png`),
//     LOADING: require(`images/3d-icons/Loading.png`),
//     LOADING_2x: require(`images/3d-icons/Loading@2x.png`),
//     LOADING_3x: require(`images/3d-icons/Loading@3x.png`),
//     NO_TRANSACTION: require(`images/3d-icons/NoTransaction.png`),
//     NO_TRANSACTION_2x: require(`images/3d-icons/NoTransaction@2x.png`),
//     NO_TRANSACTION_3x: require(`images/3d-icons/NoTransaction@3x.png`),
//     PIN: require(`images/3d-icons/Pin.png`),
//     PIN_2x: require(`images/3d-icons/Pin@2x.png`),
//     PIN_3x: require(`images/3d-icons/Pin@3x.png`),
//     PIN_LOCKED: require(`images/3d-icons/Pin_locked.png`),
//     PIN_LOCKED_2x: require(`images/3d-icons/Pin_locked@2x.png`),
//     PIN_LOCKED_3x: require(`images/3d-icons/Pin_locked@3x.png`),
//     RECOVERY: require(`images/3d-icons/Recovery.png`),
//     RECOVERY_2x: require(`images/3d-icons/Recovery@2x.png`),
//     RECOVERY_3x: require(`images/3d-icons/Recovery@3x.png`),
//     UNDERSTAND: require(`images/3d-icons/Understand.png`),
//     UNDERSTAND_2x: require(`images/3d-icons/Understand@2x.png`),
//     UNDERSTAND_3x: require(`images/3d-icons/Understand@3x.png`),
//     WALLET: require(`images/3d-icons/Wallet.png`),
//     WALLET_2x: require(`images/3d-icons/Wallet@2x.png`),
//     WALLET_3x: require(`images/3d-icons/Wallet@3x.png`),
// } as const;

// const SVG_PATH = 'images/svg';
// const SVG_IMAGES = {
//     RECOVERY_ADVANCED: require(`images/svg/recovery-advanced.svg`),
//     RECOVERY_BASIC: require(`images/svg/recovery-basic.svg`),
//     FIRMWARE_INIT_1: require(`images/svg/firmware-init-1.svg`),
//     FIRMWARE_INIT_2: require(`images/svg/firmware-init-2.svg`),
//     FIRMWARE_SUCCESS_1: require(`images/svg/firmware-success-1.svg`),
//     FIRMWARE_SUCCESS_2: require(`images/svg/firmware-success-2.svg`),
//     ALL_DONE_1: require(`images/svg/all-done-1.svg`),
//     ALL_DONE_2: require(`images/svg/all-done-2.svg`),
//     BRIDGE_QUESTION: require(`images/svg/bridge-question.svg`), // todo: not used
//     BRIDGE_SUCCESS: require(`images/svg/bridge-success.svg`), // todo: not used
//     CONFRIM_ON_DEVICE_2: require(`images/svg/confirm-on-device-2.svg`), // todo: not used
//     CREATE_NEW: require(`images/svg/create-new.svg`),
//     EXISTING_USER: require(`images/svg/existing-user.svg`),
//     HOLOGRAM_WARNING: require(`images/svg/hologram-warning.svg`), // todo: not used
//     MODEL_1: require(`images/svg/model-1.svg`),
//     MODEL_2: require(`images/svg/model-2.svg`),
//     NEW_DEVICE: require(`images/svg/new-device.svg`),
//     NEW_USER: require(`images/svg/new-user.svg`),
//     RECOVER_FROM_SEED: require(`images/svg/recover-from-seed.svg`),
//     SEED_CARD_SHAMIR: require(`images/svg/seed-card-shamir.svg`),
//     SEED_CARD_SINGLE: require(`images/svg/seed-card-single.svg`),
//     DEVICE_INITIALIZED_1: require(`images/svg/device-initialized-1.svg`),
//     DEVICE_INITIALIZED_2: require(`images/svg/device-initialized-2.svg`),
//     PIN_ASK_1: require(`images/svg/pin-ask-1.svg`),
//     PIN_ASK_2: require(`images/svg/pin-ask-2.svg`),
//     PIN_SUCCESS_1: require(`images/svg/pin-success-1.svg`),
//     PIN_SUCCESS_2: require(`images/svg/pin-success-2.svg`),
//     USED_DEVICE: require(`images/svg/used-device.svg`),
//     WRITING_SEED: require(`images/svg/writing-seed.svg`), // todo: not used
//     '12_WORDS': require(`images/svg/12-words.svg`),
//     '18_WORDS': require(`images/svg/18-words.svg`),
//     '24_WORDS': require(`images/svg/24-words.svg`),
//     EMPTY_DASHBOARD: require(`images/svg/empty-dashboard.svg`),
//     EMPTY_WALLET: require(`images/svg/wallet-empty.svg`),
//     EMPTY_WALLET_NEUE: require(`images/svg/wallet-empty-neue.png`),
//     EMPTY_WALLET_NEUE_2x: require(`images/svg/wallet-empty-neue@2x.png`),
//     ANALYTICS: require(`images/svg/analytics.svg`),
//     WELCOME: require(`images/svg/welcome.svg`),
//     UNI_ERROR: require(`images/svg/uni-error.svg`),
//     UNI_SUCCESS: require(`images/svg/uni-success.svg`),
//     UNI_WARNING: require(`images/svg/uni-warning.svg`),
//     UNI_EMPTY_PAGE: require(`images/svg/uni-empty-page.svg`),
//     TUNKNOWN: require(`images/svg/TUnknown.svg`), // todo: use in device icons
//     T1: require(`images/svg/T1.svg`),
//     T2: require(`images/svg/T2.svg`),
//     T_BRIDGE_CONFIRM: require(`images/svg/t-bridge-confirm.svg`), // todo: not used
//     T_BRIDGE_CHECK: require(`images/svg/t-bridge-check.svg`),
//     SPINNER: require(`images/svg/spinner.svg`),
//     SET_UP_PIN_DIALOG: require(`images/svg/set-up-pin-dialog.svg`),
//     ONE_DEVICE_CONFIRM: require(`images/svg/one-device-confirm.svg`),
//     DEVICE_ANOTHER_SESSION: require(`images/svg/device-another-session.svg`),
//     CONNECT_DEVICE: require(`images/svg/connect-device.svg`),
//     '404': require(`images/svg/404.svg`),
//     HOW_TO_ENTER_BOOTLOADER_MODEL_1: require(`images/svg/how-to-enter-bootloader-model-1.svg`),
//     HOW_TO_ENTER_BOOTLOADER_MODEL_2: require(`images/svg/how-to-enter-bootloader-model-2.svg`),
// } as const;

const PNG_PATH = 'images/png';

const PNG_IMAGES = {
    EMPTY_WALLET_NEUE: 'wallet-empty-neue.png',
    EMPTY_WALLET_NEUE_2x: 'wallet-empty-neue@2x.png',
    // 3D: "3D.png",
    // 3D_2x: '3D@2x.png',
    // 3D_3x: '3D@3x.png',
    BACKUP: 'Backup.png',
    BACKUP_2x: 'Backup@2x.png',
    BACKUP_3x: 'Backup@3x.png',
    CHECK: 'Check.png',
    CHECK_2x: 'Check@2x.png',
    CHECK_3x: 'Check@3x.png',
    CLOCK: 'Clock.png',
    CLOCK_2x: 'Clock@2x.png',
    CLOCK_3x: 'Clock@3x.png',
    COINS: 'Coins.png',
    COINS_2x: 'Coins@2x.png',
    COINS_3x: 'Coins@3x.png',
    ERROR: 'Error.png',
    ERROR_2x: 'Error@2x.png',
    ERROR_3x: 'Error@3x.png',
    EXTRA_INFO: 'ExtraInfo.png',
    EXTRA_INFO_2x: 'ExtraInfo@2x.png',
    EXTRA_INFO_3x: 'ExtraInfo@3x.png',
    FIRMWARE: 'Firmware.png',
    FIRMWARE_2x: 'Firmware@2x.png',
    FIRMWARE_3x: 'Firmware@3x.png',
    FOLDER: 'Folder.png',
    FOLDER_2x: 'Folder@2x.png',
    FOLDER_3x: 'Folder@3x.png',
    KEY: 'Key.png',
    KEY_2x: 'Key@2x.png',
    KEY_3x: 'Key@3x.png',
    NO_TRANSACTION: 'NoTransaction.png',
    NO_TRANSACTION_2x: 'NoTransaction@2x.png',
    NO_TRANSACTION_3x: 'NoTransaction@3x.png',
    PIN: 'Pin.png',
    PIN_2x: 'Pin@2x.png',
    PIN_3x: 'Pin@3x.png',
    PIN_LOCKED: 'Pin_locked.png',
    PIN_LOCKED_2x: 'Pin_locked@2x.png',
    PIN_LOCKED_3x: 'Pin_locked@3x.png',
    RECOVERY: 'Recovery.png',
    RECOVERY_2x: 'Recovery@2x.png',
    RECOVERY_3x: 'Recovery@3x.png',
    UNDERSTAND: 'Understand.png',
    UNDERSTAND_2x: 'Understand@2x.png',
    UNDERSTAND_3x: 'Understand@3x.png',
    WALLET: 'Wallet.png',
    WALLET_2x: 'Wallet@2x.png',
    WALLET_3x: 'Wallet@3x.png',
} as const;

const SVG_PATH = 'images/svg';
const SVG_IMAGES = {
    RECOVERY_ADVANCED: 'recovery-advanced.svg',
    RECOVERY_BASIC: 'recovery-basic.svg',
    FIRMWARE_INIT_1: 'firmware-init-1.svg',
    FIRMWARE_INIT_2: 'firmware-init-2.svg',
    FIRMWARE_SUCCESS_1: 'firmware-success-1.svg',
    FIRMWARE_SUCCESS_2: 'firmware-success-2.svg',
    ALL_DONE_1: 'all-done-1.svg',
    ALL_DONE_2: 'all-done-2.svg',
    BRIDGE_QUESTION: 'bridge-question.svg', // todo: not used
    BRIDGE_SUCCESS: 'bridge-success.svg', // todo: not used
    CONFRIM_ON_DEVICE_2: 'confirm-on-device-2.svg', // todo: not used
    CREATE_NEW: 'create-new.svg',
    EXISTING_USER: 'existing-user.svg',
    HOLOGRAM_WARNING: 'hologram-warning.svg', // todo: not used
    MODEL_1: 'model-1.svg',
    MODEL_2: 'model-2.svg',
    NEW_DEVICE: 'new-device.svg',
    NEW_USER: 'new-user.svg',
    RECOVER_FROM_SEED: 'recover-from-seed.svg',
    SEED_CARD_SHAMIR: 'seed-card-shamir.svg',
    SEED_CARD_SINGLE: 'seed-card-single.svg',
    DEVICE_INITIALIZED_1: 'device-initialized-1.svg',
    DEVICE_INITIALIZED_2: 'device-initialized-2.svg',
    PIN_ASK_1: 'pin-ask-1.svg',
    PIN_ASK_2: 'pin-ask-2.svg',
    PIN_SUCCESS_1: 'pin-success-1.svg',
    PIN_SUCCESS_2: 'pin-success-2.svg',
    USED_DEVICE: 'used-device.svg',
    WRITING_SEED: 'writing-seed.svg', // todo: not used
    '12_WORDS': '12-words.svg',
    '18_WORDS': '18-words.svg',
    '24_WORDS': '24-words.svg',
    EMPTY_DASHBOARD: 'empty-dashboard.svg',
    EMPTY_WALLET: 'wallet-empty.svg',
    ANALYTICS: 'analytics.svg',
    WELCOME: 'welcome.svg',
    UNI_ERROR: 'uni-error.svg',
    UNI_SUCCESS: 'uni-success.svg',
    UNI_WARNING: 'uni-warning.svg',
    UNI_EMPTY_PAGE: 'uni-empty-page.svg',
    TUNKNOWN: 'TUnknown.svg', // todo: use in device icons
    T1: 'T1.svg',
    T2: 'T2.svg',
    T_BRIDGE_CONFIRM: 't-bridge-confirm.svg', // todo: not used
    T_BRIDGE_CHECK: 't-bridge-check.svg',
    SPINNER: 'spinner.svg',
    SET_UP_PIN_DIALOG: 'set-up-pin-dialog.svg',
    ONE_DEVICE_CONFIRM: 'one-device-confirm.svg',
    DEVICE_ANOTHER_SESSION: 'device-another-session.svg',
    CONNECT_DEVICE: 'connect-device.svg',
    '404': '404.svg',
    HOW_TO_ENTER_BOOTLOADER_MODEL_1: 'how-to-enter-bootloader-model-1.svg',
    HOW_TO_ENTER_BOOTLOADER_MODEL_2: 'how-to-enter-bootloader-model-2.svg',
} as const;

type pngImageKey = keyof typeof PNG_IMAGES;
type svgImageKey = keyof typeof SVG_IMAGES;
export type Props = React.ImgHTMLAttributes<Omit<HTMLImageElement, 'src'>> & {
    image: pngImageKey | svgImageKey;
    alt?: string; // why? Seems not to be part of HTMLImageElement :(
};

const buildSrcSet = <
    BasePath extends string,
    ImageObject extends typeof PNG_IMAGES | typeof SVG_IMAGES,
    ImageKey extends keyof ImageObject
>(
    basePath: BasePath,
    imageObject: ImageObject,
    imageKey: ImageKey,
) => {
    const imageFile1x = imageObject[imageKey];
    const hiRes = `${imageKey}_2x`;
    const imageFile2x = hiRes in imageObject ? imageObject[hiRes as ImageKey] : undefined;
    if (!imageFile2x) return undefined;

    return `${resolveStaticPath(`${basePath}/${imageFile1x}`)} 1x, ${resolveStaticPath(
        `${basePath}/${imageFile2x}`,
    )} 2x`;
};

const Image = styled.img`
    /* should not overflow it's container */
    max-width: 100%;

    ${props =>
        props.theme.IMAGE_FILTER &&
        css`
            filter: ${props.theme.IMAGE_FILTER};
        `}
`;

const ImageComponent = ({ image, ...props }: Props) => {
    if (image in PNG_IMAGES) {
        return (
            <Image
                src={resolveStaticPath(`${PNG_PATH}/${PNG_IMAGES[image as pngImageKey]}`)}
                srcSet={buildSrcSet(PNG_PATH, PNG_IMAGES, image as pngImageKey)}
                {...props}
            />
        );
    }
    if (image in SVG_IMAGES) {
        return (
            <Image
                src={resolveStaticPath(`${SVG_PATH}/${SVG_IMAGES[image as svgImageKey]}`)}
                srcSet={buildSrcSet(SVG_PATH, SVG_IMAGES, image as svgImageKey)}
                {...props}
            />
        );
    }
    return null;
};

export default ImageComponent;
