import { AlertType } from "$lib/components/alert/Alert.models";
import { writable, type Readable, get } from "svelte/store";

export const alertStore = createAlertWriteable();

type AlertMessage = {message: string, alertType: AlertType};

interface AlertStore extends Readable<AlertMessage | null> {
    clear: (() => void);
    showMessage: ((message: string, keep: boolean) => void);
    showWarning: ((message: string, keep: boolean) => void);
    showError: ((message: string, keep: boolean) => void);
}

function createAlertWriteable(): AlertStore {
    const { set, subscribe } = writable<AlertMessage & { keep: boolean } | null>()
    
    let timeout: number | null;
    function clear() {
        if (!get({subscribe})?.keep) {
            return;
        }

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        
        set(null)
    }

    function show(message: string, keep: boolean, type: AlertType) {
        set({message, alertType: type, keep });

        if (keep) {
            return;
        }

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => clear(), 10_000);
    }
    
    return {
        subscribe,
        showMessage: (message, keep) => {
            show(message, keep, AlertType.Message);
        },
        showWarning: (message, keep) => {
            show(message, keep, AlertType.Warning);
        },
        showError: (message, keep) => {
            show(message, keep, AlertType.Error);
        },
        clear: () => clear()
    }
}