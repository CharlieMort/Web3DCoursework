import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: "./",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                robot: resolve(__dirname, 'robot.html'),
                slotmachine: resolve(__dirname, 'slot-machine.html'),
                clawmachine: resolve(__dirname, 'claw-machine.html'),
            },
        },
    },
})