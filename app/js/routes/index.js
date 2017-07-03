import Home from "../components/Home";
import SignIn from "../components/SignIn";
import OAuth2 from "../components/OAuth2";
import Project from "../components/Project";
import Projects from "../components/Projects";
import NotFound from "../components/NotFound";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import CompanyInformation from "../components/CompanyInformation";

import app from "../app";
const {
    route,
    middleware,
    setView
} = app;

import authRedirect from "./middleware/authRedirect";
import autoTokenSignIn from "./middleware/autoTokenSignIn";
import notFound from "./middleware/notFound";


middleware("/", autoTokenSignIn);

route("/terms_of_service", "terms_of_service", TermsOfService);
route("/privacy_policy", "privacy_policy", PrivacyPolicy);
route("/company_information", "company_information", CompanyInformation);

route("/sign_in", "sign_in", SignIn);
route("/oauth2/:token{.*}", "oauth2", OAuth2);

route("/", "index", Home);

middleware("/", authRedirect);

route("/projects", "projects", Projects);
route("/projects/:id", "project", Project);

setView("not_found", NotFound);
middleware("/", notFound);