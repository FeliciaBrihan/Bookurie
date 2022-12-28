// material-ui
import {
	CardContent,
	Chip,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from '@mui/material';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import { Link } from 'react-router-dom';

// assets
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import DiscountIcon from '@mui/icons-material/Discount';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import Avatar3 from 'assets/images/users/User1.png';
import { useSelector } from 'store';

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const Profile = () => {
	const { loggedUser: user } = useSelector((state) => state.user);
	const { subscription } = useSelector((state) => state.subscription);

	return (
		<Grid container spacing={gridSpacing}>
			<Grid item lg={4} xs={12}>
				<SubCard
					title={
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Avatar alt="User 1" src={Avatar3} />
							</Grid>
							<Grid item xs zeroMinWidth>
								<Typography align="left" variant="subtitle1">
									{user?.firstName} {user?.lastName}
								</Typography>
							</Grid>
						</Grid>
					}
				>
					<List component="nav" aria-label="main mailbox folders">
						<ListItemButton>
							<ListItemIcon>
								<MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
							</ListItemIcon>
							<ListItemText
								primary={<Typography variant="subtitle1">Email</Typography>}
							/>
							<ListItemSecondaryAction>
								<Typography variant="subtitle2" align="right">
									{user?.email}
								</Typography>
							</ListItemSecondaryAction>
						</ListItemButton>
						<Divider />
						<ListItemButton>
							<ListItemIcon>
								<MonetizationOnIcon sx={{ fontSize: '1.3rem' }} />
							</ListItemIcon>
							<ListItemText
								primary={<Typography variant="subtitle1"> Budget</Typography>}
							/>
							<ListItemSecondaryAction>
								<Typography variant="subtitle2" align="right">
									{user?.budget} RON
								</Typography>
							</ListItemSecondaryAction>
						</ListItemButton>
						<Divider />
						<ListItemButton>
							<ListItemIcon>
								<SubscriptionsIcon sx={{ fontSize: '1.3rem' }} />
							</ListItemIcon>
							<ListItemText
								primary={
									<Typography variant="subtitle1">Subscription</Typography>
								}
							/>
							<ListItemSecondaryAction>
								<Typography variant="subtitle2" align="right">
									{user?.subscriptionId ? (
										user?.subscriptionId === 1 ? (
											<Grid item>
												<Chip size="small" label="Basic" color="primary" />
											</Grid>
										) : (
											<Grid item>
												<Chip size="small" label="Premium" color="primary" />
											</Grid>
										)
									) : (
										<Link to="/subscriptions">Get subscription</Link>
									)}
								</Typography>
							</ListItemSecondaryAction>
						</ListItemButton>
					</List>
					<Divider />
					{subscription && (
						<>
							<ListItemButton>
								<ListItemIcon>
									<AccessTimeIcon sx={{ fontSize: '1.3rem' }} />
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography variant="subtitle1">
											Subscription Renew
										</Typography>
									}
								/>
								<ListItemSecondaryAction>
									<Typography variant="subtitle2" align="right">
										{new Intl.DateTimeFormat('en-US', {
											year: 'numeric',
											month: '2-digit',
											day: '2-digit',
											hour: '2-digit',
											minute: '2-digit',
											second: '2-digit',
										}).format(new Date(user!.subscriptionExpirationDate))}
									</Typography>
								</ListItemSecondaryAction>
							</ListItemButton>
						</>
					)}
					{user?.subscriptionId === 1 && (
						<CardContent>
							<Grid container spacing={0}>
								<Grid item xs={4}>
									<Typography align="center" variant="h3">
										<AllInclusiveIcon />
									</Typography>
									<Typography align="center" variant="subtitle2">
										Loans
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography align="center" variant="h3">
										<DiscountIcon />
									</Typography>
									<Typography align="center" variant="subtitle2">
										10 % Book Discount
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography align="center" variant="h3">
										{subscription?.monthlyFreeBooks}
									</Typography>
									<Typography align="center" variant="subtitle2">
										Free Online Books
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					)}
					{user?.subscriptionId === 2 && (
						<CardContent>
							<Grid container spacing={0}>
								<Grid item xs={4}>
									<Typography align="center" variant="h3">
										<AllInclusiveIcon />
									</Typography>
									<Typography align="center" variant="subtitle2">
										Loans & Online Books
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography align="center" variant="h3">
										<DiscountIcon />
									</Typography>
									<Typography align="center" variant="subtitle2">
										40 % Book Discount
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Typography align="center" variant="h3">
										<CardGiftcardIcon />
									</Typography>
									<Typography align="center" variant="subtitle2">
										2 Monthly Raffles
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					)}
				</SubCard>
			</Grid>
			<Grid item lg={8} xs={12}>
				<Grid container direction="column" spacing={gridSpacing}>
					<Grid item xs={12}></Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Profile;
