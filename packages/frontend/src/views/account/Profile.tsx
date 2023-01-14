// material-ui
import {
	CardContent,
	Box,
	Chip,
	Divider,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Tooltip,
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
		<Grid
			container
			spacing={gridSpacing}
			alignItems="center"
			justifyContent="center"
		>
			<Grid item xs={7}>
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
									<Typography variant="subtitle1">
										Subscription
										<Box mx={1} sx={{ display: 'inline-block' }}>
											{user?.subscriptionId ? (
												<Chip
													size="small"
													label={
														user.subscriptionId === 1 ? 'Basic' : 'Premium'
													}
													color="primary"
												/>
											) : (
												''
											)}
										</Box>
									</Typography>
								}
							/>
							<ListItemSecondaryAction>
								<Typography variant="subtitle2">
									{user?.subscriptionId ? (
										<Grid item>
											<Tooltip title="Change subscription">
												<Link to="/subscriptions">Change subscription</Link>
											</Tooltip>
										</Grid>
									) : (
										<Link to="/subscriptions">Get subscription</Link>
									)}
								</Typography>
							</ListItemSecondaryAction>
						</ListItemButton>
					</List>
					{subscription && (
						<>
							<Divider />
							<ListItemButton>
								<ListItemIcon>
									<AccessTimeIcon sx={{ fontSize: '1.3rem' }} />
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography variant="subtitle1">
											Subscription Renew
											<Box mx={1} sx={{ display: 'inline-block' }}>
												{user?.subscriptionId ? (
													<Chip size="small" label="Cancel" color="default" />
												) : (
													''
												)}
											</Box>
										</Typography>
									}
								/>
								<ListItemSecondaryAction>
									<Typography variant="subtitle2" align="right">
										{new Intl.DateTimeFormat('en-GB', {
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

					<CardContent>
						<Grid container spacing={0}>
							<Grid item xs={4}>
								<Typography align="center" variant="h3">
									<AllInclusiveIcon />
								</Typography>
								{subscription?.type === 'basic' ? (
									<Typography align="center" variant="subtitle2">
										Loans
									</Typography>
								) : (
									<Typography align="center" variant="subtitle2">
										Loans & Online Books
									</Typography>
								)}
							</Grid>
							<Grid item xs={4}>
								<Typography align="center" variant="h3">
									<DiscountIcon />
								</Typography>

								<Typography align="center" variant="subtitle2">
									{`${subscription?.everyBookDiscount} % Book Discount`}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								{subscription?.type === 'basic' ? (
									<>
										<Typography align="center" variant="h3">
											{subscription?.monthlyFreeBooks}
										</Typography>
										<Typography align="center" variant="subtitle2">
											Free Online Books
										</Typography>
									</>
								) : (
									<>
										<Typography align="center" variant="h3">
											<CardGiftcardIcon />
										</Typography>
										<Typography align="center" variant="subtitle2">
											2 Monthly Raffles
										</Typography>
									</>
								)}
							</Grid>
						</Grid>
					</CardContent>
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
