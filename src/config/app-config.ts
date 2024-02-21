export interface AppConfig {
  port: number;
}

export default (): AppConfig => ({
  port: +process.env.PORT,
});
