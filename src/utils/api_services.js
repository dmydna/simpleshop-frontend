import { devService } from "@/dev/services/devService"
import { authService } from "@/features/auth/services/authService"
import { buyService } from "@/features/checkout/service/buyService"
import { gatewayService } from "@/features/checkout/service/gatewayService"
import { favoriteService } from "@/features/favorite/services/favoriteService"
import { healthService } from "@/features/health/services/healthService"
import { listingService } from "@/features/listing/services/listingService"
import { orderService } from "@/features/order/services/orderService"
import { productService } from "@/features/product/services/productService"
import { reviewService } from "@/features/review/services/reviewService"
import { statsService } from "@/features/stats/services/statsService"
import { userService } from "@/features/user/service/userService"

export const API_SERVICES = Object.freeze({
	authService    : authService,
	userService    : userService, 
	productService : productService,
	listingService : listingService,
	orderService   : orderService,
	reviewService  : reviewService,
	favoriteService: favoriteService,
	buyService     : buyService,
	gatewayService : gatewayService,
	statsService   : statsService,
	healthService  : healthService,
	devService     : devService
})

