import { ThemeConfig } from 'antd';

const themeConfig: ThemeConfig = {
    token: {
        colorPrimary: '#c083f8',
        fontFamily: 'Nunito, sans-serif',
        colorSplit: 'transparent',
    },
    components: {
        Layout: {
            colorBgContainer: '#f0f1f3',
            headerBg: '#f5ebfa',
            siderBg: '#f5ebfa',
            bodyBg: '#d0d3d9 ',
        },
        Select: {
            controlItemBgHover: '#e6d3f0',
            controlItemBgActive: '#c083f8',
            colorText: '#4a2560',
            colorTextDisabled: '#b5a6c8',
            colorBgTextHover: '#6b3f7a',
            colorBgTextActive: '#4a2560',
            optionSelectedBg: '#b081d9',
            optionSelectedColor: '#ffffff',
        },
        Input: {
            colorBgContainer: '#ffffff',
            colorText: '#4a2560',
            colorBorder: '#c083f8',
            colorInfoBorderHover: '#8a4db7',
            colorBgContainerDisabled: '#f0f0f0',
            controlOutline: 'rgba(192, 131, 248, 0.5)',
        },
        Table: {
            headerBg: '#c083f8',
            rowHoverBg: '#f5ebfa',
            colorBgContainer: '#f5ebfa',
            borderColor: '#f5ebfa',
        },
        Button: {
            colorLink: '#c083f8',
            colorLinkHover: '#8a4db7',
            colorText: '#c083f8',
            colorBgTextActive: 'transparent',
            colorInfoTextActive: '#8a4db7',
        },
    },
};

export default themeConfig;
