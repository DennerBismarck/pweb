import { Xablau, Mensagem } from "./componentes";
import { DoutorMenu } from "../page";

export default function NovaRotaHome() {
  return (
    <div>
      <DoutorMenu />
      <Xablau />
      <Mensagem texto={"Lambimia"} />
    </div>
  );
}
