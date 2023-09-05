import Headline from './Headline';
import Medias from './Medias';

const Campaign = ({ campaign }) => {
  console.log(campaign);
  const {
    campaign_icon_url: icon,
    campaign_name: name,
    pay_per_install: payPerInstall,
    medias,
  } = campaign;

  return (
    <>
      <Headline icon={icon} name={name} payPerInstall={payPerInstall} />
      <Medias medias={medias} />
    </>
  );
};

export default Campaign;
