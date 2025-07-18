import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer id="footer" className="w-full flex justify-center mt-10">
      <div className="w-full max-w-7xl rounded-2xl px-6 py-10
        backdrop-blur-md shadow-xl
        flex flex-col md:flex-row md:items-start gap-10 md:gap-0 md:justify-between">
        {/* Info */}
        <div className="flex-1 min-w-[140px]">
          <h3 className="font-bold mb-4 text-2xl">{t('footer.info')}</h3>
          <ul className="space-y-2  text-white/80">
            <li>{t('footer.formats')}</li>
            <li>{t('footer.compression')}</li>
            <li>{t('footer.pricing')}</li>
            <li>{t('footer.faq')}</li>
            <li>{t('footer.status')}</li>
            <li>{t('footer.policy')}</li>
          </ul>
        </div>
        {/* Getting Started */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="font-bold mb-4 text-2xl">{t('footer.getting_started')}</h3>
          <ul className="space-y-2 text-white/80">
            <li>{t('footer.introduction')}</li>
            <li>{t('footer.themes')}</li>
            <li>{t('footer.documentation')}</li>
            <li>{t('footer.usages')}</li>
            <li>{t('footer.elements')}</li>
            <li>{t('footer.global')}</li>
          </ul>
        </div>
        {/* Resources */}
        <div className="flex-1 min-w-[160px]">
          <h3 className="font-bold mb-4 text-2xl">{t('footer.resources')}</h3>
          <ul className="space-y-2  text-white/80">
            <li>{t('footer.api')}</li>
            <li>{t('footer.form_validation')}</li>
            <li>{t('footer.accessibility')}</li>
            <li>{t('footer.marketplace')}</li>
            <li>{t('footer.visibility')}</li>
            <li>{t('footer.community')}</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div className="flex-1 min-w-[240px]">
          <h3 className="font-bold mb-4  text-2xl">{t('footer.newsletter')}</h3>
          <p className="text-sm text-white/80 mb-4">{t('footer.newsletter_desc')}</p>
          <form className="flex mb-5 w-full max-w-xs">
            <input
              type="email"
              placeholder={t('footer.email_placeholder')}
              className="rounded-l px-4 py-2 bg-white/30 border-none text-white placeholder:text-white/60 focus:outline-none w-2/3"
            />
            <button
              type="submit"
              className="rounded-r bg-white text-black px-4 py-2 font-semibold hover:bg-gray-200 transition w-1/1 text-sm"
            >
              {t('footer.subscribe')}
            </button>
          </form>
          <div className="flex gap-4 text-2xl justify-start">
            <a href="https://www.facebook.com/mac.nhu.huu.2025" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaFacebook />
            </a>
            <a href="https://github.com/macchu25" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaGithub />
            </a>
            <a href="https://www.youtube.com/@macchu5880" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/skrttt.macchu_/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@macchu_heh" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FaTiktok />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaTwitter />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;