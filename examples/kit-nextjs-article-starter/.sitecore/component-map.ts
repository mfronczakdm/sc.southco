// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCServerWrapper, NextjsContentSdkComponent, FEaaSServerWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as videoprops from 'src/components/video/video-props';
import * as VideoPlayerdev from 'src/components/video/VideoPlayer.dev';
import * as VideoModaldev from 'src/components/video/VideoModal.dev';
import * as Video from 'src/components/video/Video';
import * as verticalimageaccordionprops from 'src/components/vertical-image-accordion/vertical-image-accordion.props';
import * as VerticalImageAccordion from 'src/components/vertical-image-accordion/VerticalImageAccordion';
import * as topiclistingprops from 'src/components/topic-listing/topic-listing.props';
import * as TopicListing from 'src/components/topic-listing/TopicListing';
import * as TopicItemdev from 'src/components/topic-listing/TopicItem.dev';
import * as themeproviderdev from 'src/components/theme-provider/theme-provider.dev';
import * as textbannerprops from 'src/components/text-banner/text-banner.props';
import * as TextBannerDefaultdev from 'src/components/text-banner/TextBannerDefault.dev';
import * as TextBanner02dev from 'src/components/text-banner/TextBanner02.dev';
import * as TextBanner01dev from 'src/components/text-banner/TextBanner01.dev';
import * as TextBanner from 'src/components/text-banner/TextBanner';
import * as testimonialcarouselprops from 'src/components/testimonial-carousel/testimonial-carousel.props';
import * as TestimonialCarouselItem from 'src/components/testimonial-carousel/TestimonialCarouselItem';
import * as TestimonialCarousel from 'src/components/testimonial-carousel/TestimonialCarousel';
import * as Title from 'src/components/sxa/Title';
import * as RowSplitter from 'src/components/sxa/RowSplitter';
import * as RichText from 'src/components/sxa/RichText';
import * as Promo from 'src/components/sxa/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/sxa/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/sxa/PageContent';
import * as NavigationMenuToggleclient from 'src/components/sxa/NavigationMenuToggle.client';
import * as NavigationListclient from 'src/components/sxa/NavigationList.client';
import * as Navigation from 'src/components/sxa/Navigation';
import * as LinkList from 'src/components/sxa/LinkList';
import * as Image from 'src/components/sxa/Image';
import * as ContentBlock from 'src/components/sxa/ContentBlock';
import * as Container from 'src/components/sxa/Container';
import * as ColumnSplitter from 'src/components/sxa/ColumnSplitter';
import * as subscriptionbannerprops from 'src/components/subscription-banner/subscription-banner.props';
import * as subscriptionbannerdictionary from 'src/components/subscription-banner/subscription-banner.dictionary';
import * as SubscriptionBanner from 'src/components/subscription-banner/SubscriptionBanner';
import * as StructuredData from 'src/components/structured-data/StructuredData';
import * as navitems from 'src/components/southco-commerce-header/nav-items';
import * as SouthCoCommerceHeader from 'src/components/southco-commerce-header/SouthCoCommerceHeader';
import * as SearchButton from 'src/components/southco-commerce-header/SearchButton';
import * as MobileNav from 'src/components/southco-commerce-header/MobileNav';
import * as MiniCart from 'src/components/southco-commerce-header/MiniCart';
import * as footerlinks from 'src/components/southco-commerce-footer/footer-links';
import * as SouthCoCommerceFooter from 'src/components/southco-commerce-footer/SouthCoCommerceFooter';
import * as sitemetadataprops from 'src/components/site-metadata/site-metadata.props';
import * as SiteMetadata from 'src/components/site-metadata/SiteMetadata';
import * as secondarynavigationprops from 'src/components/secondary-navigation/secondary-navigation.props';
import * as SecondaryNavigation from 'src/components/secondary-navigation/SecondaryNavigation';
import * as richtextblockprops from 'src/components/rich-text-block/rich-text-block.props';
import * as RichTextBlock from 'src/components/rich-text-block/RichTextBlock';
import * as promoblockprops from 'src/components/promo-block/promo-block.props';
import * as PromoBlock from 'src/components/promo-block/PromoBlock';
import * as promoanimatedutil from 'src/components/promo-animated/promo-animated.util';
import * as promoanimatedprops from 'src/components/promo-animated/promo-animated.props';
import * as PromoAnimatedImageRightdev from 'src/components/promo-animated/PromoAnimatedImageRight.dev';
import * as PromoAnimatedDefaultdev from 'src/components/promo-animated/PromoAnimatedDefault.dev';
import * as PromoAnimated from 'src/components/promo-animated/PromoAnimated';
import * as lib from 'src/components/product/lib';
import * as ProductDisplay from 'src/components/product/ProductDisplay';
import * as AddToCartButton from 'src/components/product/AddToCartButton';
import * as portaldev from 'src/components/portal/portal.dev';
import * as pageheaderprops from 'src/components/page-header/page-header.props';
import * as PageHeader from 'src/components/page-header/PageHeader';
import * as multipromotabsprops from 'src/components/multi-promo-tabs/multi-promo-tabs.props';
import * as MultiPromoTabs from 'src/components/multi-promo-tabs/MultiPromoTabs';
import * as MultiPromoTabdev from 'src/components/multi-promo-tabs/MultiPromoTab.dev';
import * as multipromoprops from 'src/components/multi-promo/multi-promo.props';
import * as MultiPromoItemdev from 'src/components/multi-promo/MultiPromoItem.dev';
import * as MultiPromo from 'src/components/multi-promo/MultiPromo';
import * as modetoggledev from 'src/components/mode-toggle/mode-toggle.dev';
import * as mediasectionprops from 'src/components/media-section/media-section.props';
import * as MediaSectiondev from 'src/components/media-section/MediaSection.dev';
import * as meteors from 'src/components/magicui/meteors';
import * as logotabsprops from 'src/components/logo-tabs/logo-tabs.props';
import * as LogoTabs from 'src/components/logo-tabs/LogoTabs';
import * as LogoItem from 'src/components/logo-tabs/LogoItem';
import * as logoprops from 'src/components/logo/logo.props';
import * as Logodev from 'src/components/logo/Logo.dev';
import * as nextImageSrcdev from 'src/components/image/nextImageSrc.dev';
import * as imageprops from 'src/components/image/image.props';
import * as imageoptimizationcontext from 'src/components/image/image-optimization.context';
import * as ImageWrapperdev from 'src/components/image/ImageWrapper.dev';
import * as ImageWrapperclient from 'src/components/image/ImageWrapper.client';
import * as ImageBlock from 'src/components/image/ImageBlock';
import * as Icon from 'src/components/icon/Icon';
import * as signaldev from 'src/components/icon/svg/signal.dev';
import * as playdev from 'src/components/icon/svg/play.dev';
import * as diversitydev from 'src/components/icon/svg/diversity.dev';
import * as crossarrowsdev from 'src/components/icon/svg/cross-arrows.dev';
import * as communitiesdev from 'src/components/icon/svg/communities.dev';
import * as arrowuprightdev from 'src/components/icon/svg/arrow-up-right.dev';
import * as arrowrightdev from 'src/components/icon/svg/arrow-right.dev';
import * as arrowleftdev from 'src/components/icon/svg/arrow-left.dev';
import * as YoutubeIcondev from 'src/components/icon/svg/YoutubeIcon.dev';
import * as TwitterIcondev from 'src/components/icon/svg/TwitterIcon.dev';
import * as LinkedInIcondev from 'src/components/icon/svg/LinkedInIcon.dev';
import * as InternalIcondev from 'src/components/icon/svg/InternalIcon.dev';
import * as InstagramIcondev from 'src/components/icon/svg/InstagramIcon.dev';
import * as FileIcondev from 'src/components/icon/svg/FileIcon.dev';
import * as FacebookIcondev from 'src/components/icon/svg/FacebookIcon.dev';
import * as ExternalIcondev from 'src/components/icon/svg/ExternalIcon.dev';
import * as EmailIcondev from 'src/components/icon/svg/EmailIcon.dev';
import * as heroprops from 'src/components/hero/hero.props';
import * as Hero from 'src/components/hero/Hero';
import * as globalheaderprops from 'src/components/global-header/global-header.props';
import * as GlobalHeader from 'src/components/global-header/GlobalHeader';
import * as globalfooterprops from 'src/components/global-footer/global-footer.props';
import * as GlobalFooter from 'src/components/global-footer/GlobalFooter';
import * as FooterNavigationColumn from 'src/components/global-footer/FooterNavigationColumn';
import * as FooterNavigationCalloutdev from 'src/components/footer-navigation-callout/FooterNavigationCallout.dev';
import * as floatingdockdev from 'src/components/floating-dock/floating-dock.dev';
import * as Flexdev from 'src/components/flex/Flex.dev';
import * as CtaBanner from 'src/components/cta-banner/CtaBanner';
import * as containerutil from 'src/components/container/container.util';
import * as ContainerFullWidth from 'src/components/container/container-full-width/ContainerFullWidth';
import * as ContainerFullBleed from 'src/components/container/container-full-bleed/ContainerFullBleed';
import * as Container7030 from 'src/components/container/container-7030/Container7030';
import * as Container70 from 'src/components/container/container-70/Container70';
import * as Container6321 from 'src/components/container/container-6321/Container6321';
import * as Container6040 from 'src/components/container/container-6040/Container6040';
import * as Container5050 from 'src/components/container/container-5050/Container5050';
import * as Container4060 from 'src/components/container/container-4060/Container4060';
import * as Container3070 from 'src/components/container/container-3070/Container3070';
import * as Container303030 from 'src/components/container/container-303030/Container303030';
import * as Container25252525 from 'src/components/container/container-25252525/Container25252525';
import * as categoryurls from 'src/components/commerce/category-urls';
import * as cartevents from 'src/components/commerce/cart-events';
import * as CategoryListing from 'src/components/commerce/CategoryListing';
import * as CartPage from 'src/components/cart/CartPage';
import * as CartContents from 'src/components/cart/CartContents';
import * as Carddev from 'src/components/card/Card.dev';
import * as ButtonComponent from 'src/components/button-component/ButtonComponent';
import * as Breadcrumbs from 'src/components/breadcrumbs/Breadcrumbs';
import * as BackgroundThumbnaildev from 'src/components/background-thumbnail/BackgroundThumbnail.dev';
import * as ArticleListing from 'src/components/article-listing/ArticleListing';
import * as articleheaderdictionary from 'src/components/article-header/article-header.dictionary';
import * as ArticleHeader from 'src/components/article-header/ArticleHeader';
import * as AnimatedSectiondev from 'src/components/animated-section/AnimatedSection.dev';
import * as AlertBannerdev from 'src/components/alert-banner/AlertBanner.dev';
import * as accordionblockprops from 'src/components/accordion-block/accordion-block.props';
import * as AccordionBlockItemdev from 'src/components/accordion-block/AccordionBlockItem.dev';
import * as AccordionBlockDefaultdev from 'src/components/accordion-block/AccordionBlockDefault.dev';
import * as AccordionBlock from 'src/components/accordion-block/AccordionBlock';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCServerWrapper],
  ['FEaaSWrapper', FEaaSServerWrapper],
  ['Form', { ...Form, componentType: 'client' }],
  ['video-props', { ...videoprops }],
  ['VideoPlayer', { ...VideoPlayerdev }],
  ['VideoModal', { ...VideoModaldev }],
  ['Video', { ...Video, componentType: 'client' }],
  ['vertical-image-accordion', { ...verticalimageaccordionprops }],
  ['VerticalImageAccordion', { ...VerticalImageAccordion, componentType: 'client' }],
  ['topic-listing', { ...topiclistingprops }],
  ['TopicListing', { ...TopicListing }],
  ['TopicItem', { ...TopicItemdev }],
  ['theme-provider', { ...themeproviderdev }],
  ['text-banner', { ...textbannerprops }],
  ['TextBannerDefault', { ...TextBannerDefaultdev }],
  ['TextBanner02', { ...TextBanner02dev }],
  ['TextBanner01', { ...TextBanner01dev }],
  ['TextBanner', { ...TextBanner }],
  ['testimonial-carousel', { ...testimonialcarouselprops }],
  ['TestimonialCarouselItem', { ...TestimonialCarouselItem }],
  ['TestimonialCarousel', { ...TestimonialCarousel, componentType: 'client' }],
  ['Title', { ...Title, componentType: 'client' }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['NavigationMenuToggle', { ...NavigationMenuToggleclient }],
  ['NavigationList', { ...NavigationListclient }],
  ['Navigation', { ...Navigation }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock, componentType: 'client' }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['subscription-banner', { ...subscriptionbannerprops, ...subscriptionbannerdictionary }],
  ['SubscriptionBanner', { ...SubscriptionBanner, componentType: 'client' }],
  ['StructuredData', { ...StructuredData }],
  ['nav-items', { ...navitems }],
  ['SouthCoCommerceHeader', { ...SouthCoCommerceHeader }],
  ['SearchButton', { ...SearchButton, componentType: 'client' }],
  ['MobileNav', { ...MobileNav, componentType: 'client' }],
  ['MiniCart', { ...MiniCart, componentType: 'client' }],
  ['footer-links', { ...footerlinks }],
  ['SouthCoCommerceFooter', { ...SouthCoCommerceFooter }],
  ['site-metadata', { ...sitemetadataprops }],
  ['SiteMetadata', { ...SiteMetadata }],
  ['secondary-navigation', { ...secondarynavigationprops }],
  ['SecondaryNavigation', { ...SecondaryNavigation, componentType: 'client' }],
  ['rich-text-block', { ...richtextblockprops }],
  ['RichTextBlock', { ...RichTextBlock }],
  ['promo-block', { ...promoblockprops }],
  ['PromoBlock', { ...PromoBlock }],
  ['promo-animated', { ...promoanimatedutil, ...promoanimatedprops }],
  ['PromoAnimatedImageRight', { ...PromoAnimatedImageRightdev }],
  ['PromoAnimatedDefault', { ...PromoAnimatedDefaultdev }],
  ['PromoAnimated', { ...PromoAnimated, componentType: 'client' }],
  ['lib', { ...lib }],
  ['ProductDisplay', { ...ProductDisplay }],
  ['AddToCartButton', { ...AddToCartButton, componentType: 'client' }],
  ['portal', { ...portaldev }],
  ['page-header', { ...pageheaderprops }],
  ['PageHeader', { ...PageHeader, componentType: 'client' }],
  ['multi-promo-tabs', { ...multipromotabsprops }],
  ['MultiPromoTabs', { ...MultiPromoTabs, componentType: 'client' }],
  ['MultiPromoTab', { ...MultiPromoTabdev }],
  ['multi-promo', { ...multipromoprops }],
  ['MultiPromoItem', { ...MultiPromoItemdev }],
  ['MultiPromo', { ...MultiPromo, componentType: 'client' }],
  ['mode-toggle', { ...modetoggledev }],
  ['media-section', { ...mediasectionprops }],
  ['MediaSection', { ...MediaSectiondev }],
  ['meteors', { ...meteors, componentType: 'client' }],
  ['logo-tabs', { ...logotabsprops }],
  ['LogoTabs', { ...LogoTabs, componentType: 'client' }],
  ['LogoItem', { ...LogoItem }],
  ['logo', { ...logoprops }],
  ['Logo', { ...Logodev }],
  ['nextImageSrc', { ...nextImageSrcdev }],
  ['image', { ...imageprops }],
  ['image-optimization', { ...imageoptimizationcontext }],
  ['ImageWrapper', { ...ImageWrapperdev, ...ImageWrapperclient }],
  ['ImageBlock', { ...ImageBlock }],
  ['Icon', { ...Icon, componentType: 'client' }],
  ['signal', { ...signaldev }],
  ['play', { ...playdev }],
  ['diversity', { ...diversitydev }],
  ['cross-arrows', { ...crossarrowsdev }],
  ['communities', { ...communitiesdev }],
  ['arrow-up-right', { ...arrowuprightdev }],
  ['arrow-right', { ...arrowrightdev }],
  ['arrow-left', { ...arrowleftdev }],
  ['YoutubeIcon', { ...YoutubeIcondev }],
  ['TwitterIcon', { ...TwitterIcondev }],
  ['LinkedInIcon', { ...LinkedInIcondev }],
  ['InternalIcon', { ...InternalIcondev }],
  ['InstagramIcon', { ...InstagramIcondev }],
  ['FileIcon', { ...FileIcondev }],
  ['FacebookIcon', { ...FacebookIcondev }],
  ['ExternalIcon', { ...ExternalIcondev }],
  ['EmailIcon', { ...EmailIcondev }],
  ['hero', { ...heroprops }],
  ['Hero', { ...Hero, componentType: 'client' }],
  ['global-header', { ...globalheaderprops }],
  ['GlobalHeader', { ...GlobalHeader, componentType: 'client' }],
  ['global-footer', { ...globalfooterprops }],
  ['GlobalFooter', { ...GlobalFooter }],
  ['FooterNavigationColumn', { ...FooterNavigationColumn, componentType: 'client' }],
  ['FooterNavigationCallout', { ...FooterNavigationCalloutdev }],
  ['floating-dock', { ...floatingdockdev }],
  ['Flex', { ...Flexdev }],
  ['CtaBanner', { ...CtaBanner }],
  ['container', { ...containerutil }],
  ['ContainerFullWidth', { ...ContainerFullWidth }],
  ['ContainerFullBleed', { ...ContainerFullBleed }],
  ['Container7030', { ...Container7030 }],
  ['Container70', { ...Container70 }],
  ['Container6321', { ...Container6321 }],
  ['Container6040', { ...Container6040 }],
  ['Container5050', { ...Container5050 }],
  ['Container4060', { ...Container4060 }],
  ['Container3070', { ...Container3070 }],
  ['Container303030', { ...Container303030 }],
  ['Container25252525', { ...Container25252525 }],
  ['category-urls', { ...categoryurls }],
  ['cart-events', { ...cartevents }],
  ['CategoryListing', { ...CategoryListing }],
  ['CartPage', { ...CartPage }],
  ['CartContents', { ...CartContents, componentType: 'client' }],
  ['Card', { ...Carddev }],
  ['ButtonComponent', { ...ButtonComponent }],
  ['Breadcrumbs', { ...Breadcrumbs }],
  ['BackgroundThumbnail', { ...BackgroundThumbnaildev }],
  ['ArticleListing', { ...ArticleListing, componentType: 'client' }],
  ['article-header', { ...articleheaderdictionary }],
  ['ArticleHeader', { ...ArticleHeader, componentType: 'client' }],
  ['AnimatedSection', { ...AnimatedSectiondev }],
  ['AlertBanner', { ...AlertBannerdev }],
  ['accordion-block', { ...accordionblockprops }],
  ['AccordionBlockItem', { ...AccordionBlockItemdev }],
  ['AccordionBlockDefault', { ...AccordionBlockDefaultdev }],
  ['AccordionBlock', { ...AccordionBlock, componentType: 'client' }],
]);

export default componentMap;
