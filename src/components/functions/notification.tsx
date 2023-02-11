
import { notification } from 'antd';

export const openNotificationWithIcon = (Title: string, description: string) => {
    if (Title == "success") {
        notification.success({
            message: Title || "",
            description: description || "",
            placement: "topRight"
        })
    }
    else {
        notification.error({
            message: Title || "",
            description: description || "",
            placement: "topRight"
        })
    }

};

