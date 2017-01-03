export class StaticUrl {
    
    //FIXME remove
    public static get SERVER(): string { return "http://127.0.0.1:8080";}
    public static get ROOT(): string { return "/";}

    // PUBLIC
    public static get PUBLIC_ALL(): string { return "/public/**";}
    public static get PUBLIC_ROOT(): string { return "/public/";}
    public static get PUBLIC(): string { return "/public";}
    public static get LOGIN(): string { return this.SERVER + "/public/login";}
    public static get LOGOUT(): string { return this.SERVER +"/public/logout";}

    // CRUD
    public static get FIND_BY_ID(): string { return "/{id}";}
    public static get FIND_ALL(): string { return "/";}
    public static get SAVE(): string { return "/";}
    public static get UPDATE(): string { return "/{id}";}
    public static get DELETE(): string { return "/{id}";}
    public static get EDIT(): string { return "/{id}";}
    public static get NEW(): string { return "/new";}

    // SPECIFIC
    public static get SIGNUP(): string { return "/signUp";}
    public static get USER(): string { return "/user";}
    public static get TEST(): string { return "/test";}
    public static get ADMIN(): string { return "/admin";}
    public static get CATEGORY(): string { return this.SERVER +"/category";}

    public static get CATEGORY_ALL(): string { return this.CATEGORY + this.FIND_ALL;}
    public static get CATEGORY_BY_ID(): string { return this.CATEGORY + this.FIND_BY_ID;}
    public static get CATEGORY_SAVE(): string { return this.CATEGORY + this.SAVE;}
    
    // TEST

    // URI
    public static get SIGNUP_TEST(): string { return this.PUBLIC + "/signUp";}
    
    //ROUTER
    public static get ROUTER_HOME(): string { return "home";}
    public static get ROUTER_CATEGORY(): string { return "category";}
    public static get ROUTER_LOGIN(): string { return "/login";}
    public static get ROUTER_NEW(): string { return "new";}
    
}